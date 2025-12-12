import { z } from 'zod'

export type KnowledgeDocId =
  | 'grabovoi_database.json'
  | 'GUIA_COMPLETA_PRK1U.md'
  | 'GUIA_RAPIDA_GRABOVOI.md'
  | 'INDICE_RAPIDO_POR_NECESIDAD.md'
  | 'LISTA_COMPLETA_SECUENCIAS.md'

export type KnowledgeSnippet = {
  source: KnowledgeDocId
  title: string
  content: string
  score: number
}

type MarkdownSection = {
  title: string
  level: number
  body: string
}

const BookSchema = z.object({
  id: z.number(),
  titulo_espanol: z.string().optional(),
  titulo_original: z.string().optional(),
  titulo_alternativo: z.string().optional(),
  categoria: z.string().optional(),
  resumen: z.string().optional(),
  conceptos_clave: z.array(z.string()).optional(),
  secuencias_destacadas: z
    .array(
      z.object({
        secuencia: z.string().optional(),
        proposito: z.string().optional(),
      })
    )
    .optional(),
})

const GrabovoiDbSchema = z.object({
  libros: z.array(BookSchema).optional(),
  dispositivo_prk1u: z
    .object({
      nombre_completo: z.string().optional(),
      descripcion_general: z.string().optional(),
    })
    .optional(),
})

type GrabovoiDb = z.infer<typeof GrabovoiDbSchema>

export type KnowledgeRetrievalInput = {
  question: string
  maxSnippets: number
  maxCharsPerSnippet: number
  maxTotalChars: number
}

type KnowledgePublicPaths = {
  grabovoiDb: string
  guiaPrk: string
  guiaRapida: string
  indiceRapido: string
  listaSecuencias: string
}

function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenize(input: string): string[] {
  const normalized = normalizeText(input)
  if (normalized.length === 0) return []
  return normalized.split(' ')
}

function extractDigitQueries(input: string): string[] {
  const collapsed = input.replace(/\s+/g, '')
  const matches = collapsed.match(/\d{3,}/g) ?? []
  return matches.slice(0, 6)
}

function scoreByOverlap(queryTokens: ReadonlyArray<string>, text: string): number {
  if (queryTokens.length === 0) return 0
  const textTokens = new Set(tokenize(text))
  let score = 0
  for (const t of queryTokens) {
    if (t.length < 3) continue
    if (textTokens.has(t)) score += 2
  }
  return score
}

function truncateToChars(input: string, maxChars: number): string {
  if (input.length <= maxChars) return input
  return `${input.slice(0, Math.max(0, maxChars - 1)).trimEnd()}…`
}

function parseMarkdownSections(markdown: string): MarkdownSection[] {
  const lines = markdown.split('\n')
  const sections: MarkdownSection[] = []

  let currentTitle = 'Intro'
  let currentLevel = 1
  let currentBodyLines: string[] = []

  const flush = (): void => {
    const body = currentBodyLines.join('\n').trim()
    if (body.length === 0) return
    sections.push({ title: currentTitle, level: currentLevel, body })
  }

  for (const line of lines) {
    const match = /^(#{1,3})\s+(.*)$/.exec(line.trim())
    if (match) {
      flush()
      currentTitle = match[2].trim()
      currentLevel = match[1].length
      currentBodyLines = []
      continue
    }
    currentBodyLines.push(line)
  }

  flush()
  return sections
}

async function fetchUtf8(baseUrl: string, relativePath: string): Promise<string> {
  const url = new URL(relativePath, baseUrl)
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`No se pudo cargar ${relativePath}: HTTP ${res.status} ${text}`)
  }
  return await res.text()
}

function getDefaultPublicPaths(): KnowledgePublicPaths {
  return {
    grabovoiDb: '/data/grabovoi_database.json',
    guiaPrk: '/data/GUIA_COMPLETA_PRK1U.md',
    guiaRapida: '/data/GUIA_RAPIDA_GRABOVOI.md',
    indiceRapido: '/data/INDICE_RAPIDO_POR_NECESIDAD.md',
    listaSecuencias: '/data/LISTA_COMPLETA_SECUENCIAS.md',
  }
}

async function loadDocsFromPublic(baseUrl: string): Promise<{
  db: GrabovoiDb
  md: Record<Exclude<KnowledgeDocId, 'grabovoi_database.json'>, string>
}> {
  const p = getDefaultPublicPaths()
  const [dbRaw, guiaPrk, guiaRapida, indiceRapido, listaSecuencias] = await Promise.all([
    fetchUtf8(baseUrl, p.grabovoiDb),
    fetchUtf8(baseUrl, p.guiaPrk),
    fetchUtf8(baseUrl, p.guiaRapida),
    fetchUtf8(baseUrl, p.indiceRapido),
    fetchUtf8(baseUrl, p.listaSecuencias),
  ])

  const dbJsonUnknown: unknown = JSON.parse(dbRaw)
  const parsed = GrabovoiDbSchema.safeParse(dbJsonUnknown)
  if (!parsed.success) {
    throw new Error('grabovoi_database.json tiene un formato inesperado (falló validación mínima)')
  }

  return {
    db: parsed.data,
    md: {
      'GUIA_COMPLETA_PRK1U.md': guiaPrk,
      'GUIA_RAPIDA_GRABOVOI.md': guiaRapida,
      'INDICE_RAPIDO_POR_NECESIDAD.md': indiceRapido,
      'LISTA_COMPLETA_SECUENCIAS.md': listaSecuencias,
    },
  }
}

function buildBookSnippets(db: GrabovoiDb, question: string): KnowledgeSnippet[] {
  const qTokens = tokenize(question)
  const digitQueries = extractDigitQueries(question)

  const books = db.libros ?? []
  const results: KnowledgeSnippet[] = []

  for (const book of books) {
    const title = book.titulo_espanol ?? book.titulo_alternativo ?? book.titulo_original ?? `Libro ${book.id}`
    const haystack = [
      title,
      book.categoria ?? '',
      book.resumen ?? '',
      (book.conceptos_clave ?? []).join(' '),
      (book.secuencias_destacadas ?? [])
        .filter((s) => typeof s.secuencia === 'string' && typeof s.proposito === 'string')
        .map((s) => `${s.secuencia} ${s.proposito}`)
        .join(' '),
    ].join('\n')

    let score = scoreByOverlap(qTokens, haystack)
    for (const dq of digitQueries) {
      if (haystack.includes(dq)) score += 10
    }

    if (score <= 0) continue

    const highlighted = [
      `Libro: ${title}`,
      book.categoria ? `Categoría: ${book.categoria}` : '',
      book.resumen ? `Resumen: ${book.resumen}` : '',
      (book.secuencias_destacadas ?? []).some(
        (s) => typeof s.secuencia === 'string' && typeof s.proposito === 'string'
      )
        ? `Secuencias destacadas: ${(book.secuencias_destacadas ?? [])
            .filter((s) => typeof s.secuencia === 'string' && typeof s.proposito === 'string')
            .slice(0, 6)
            .map((s) => `${s.secuencia} (${s.proposito})`)
            .join(', ')}`
        : '',
    ]
      .filter((x) => x.trim().length > 0)
      .join('\n')

    results.push({
      source: 'grabovoi_database.json',
      title,
      content: highlighted,
      score,
    })
  }

  // Add PRK summary if the question is about PRK-1U.
  const mentionsPrk = normalizeText(question).includes('prk')
  if (mentionsPrk && db.dispositivo_prk1u) {
    const title = db.dispositivo_prk1u.nombre_completo ?? 'PRK-1U'
    const content = [
      db.dispositivo_prk1u.nombre_completo ? `Nombre: ${db.dispositivo_prk1u.nombre_completo}` : '',
      db.dispositivo_prk1u.descripcion_general ? `Descripción: ${db.dispositivo_prk1u.descripcion_general}` : '',
    ]
      .filter((x) => x.trim().length > 0)
      .join('\n')

    if (content.trim().length > 0) {
      results.push({
        source: 'grabovoi_database.json',
        title,
        content,
        score: 50,
      })
    }
  }

  return results
}

function buildMarkdownSnippets(
  docId: Exclude<KnowledgeDocId, 'grabovoi_database.json'>,
  markdown: string,
  question: string
): KnowledgeSnippet[] {
  const sections = parseMarkdownSections(markdown)
  const qTokens = tokenize(question)
  const digitQueries = extractDigitQueries(question)

  const scored = sections
    .map((s) => {
      const haystack = `${s.title}\n${s.body}`
      let score = scoreByOverlap(qTokens, haystack)
      for (const dq of digitQueries) {
        if (haystack.includes(dq)) score += 10
      }
      return { section: s, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.map((x) => ({
    source: docId,
    title: x.section.title,
    content: x.section.body,
    score: x.score,
  }))
}

export async function retrieveKnowledgeContext(
  input: KnowledgeRetrievalInput,
  baseUrl: string
): Promise<KnowledgeSnippet[]> {
  const { question, maxSnippets, maxCharsPerSnippet, maxTotalChars } = input
  const docs = await loadDocsFromPublic(baseUrl)

  const dbSnippets = buildBookSnippets(docs.db, question)
  const mdSnippets = (
    Object.entries(docs.md) as Array<
      [Exclude<KnowledgeDocId, 'grabovoi_database.json'>, string]
    >
  ).flatMap(([docId, md]) => buildMarkdownSnippets(docId, md, question))

  const all = [...dbSnippets, ...mdSnippets].sort((a, b) => b.score - a.score)

  const selected: KnowledgeSnippet[] = []
  let totalChars = 0

  for (const snip of all) {
    if (selected.length >= maxSnippets) break
    const trimmed = truncateToChars(snip.content, maxCharsPerSnippet)
    if (trimmed.length === 0) continue
    if (totalChars + trimmed.length > maxTotalChars) continue

    selected.push({ ...snip, content: trimmed })
    totalChars += trimmed.length
  }

  return selected
}

