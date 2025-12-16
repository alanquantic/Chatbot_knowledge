const ALLOWED_TAGS = new Set<string>(['p', 'br', 'ul', 'ol', 'li', 'strong', 'em', 'blockquote'])

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined'
}

function unwrap(el: Element): void {
  const parent = el.parentNode
  if (!parent) return
  while (el.firstChild) parent.insertBefore(el.firstChild, el)
  parent.removeChild(el)
}

/**
 * Sanitiza HTML generado por el modelo usando una allowlist estricta.
 * - Elimina tags no permitidos (los "desenvuelve" para conservar texto)
 * - Elimina atributos
 * - Bloquea scripts/handlers
 *
 * Nota: se usa en un componente "use client"; requiere DOMParser.
 */
export function sanitizeChatbotHtml(input: string): string {
  const raw = (input ?? '').trim()
  if (raw.length === 0) return ''
  if (!isBrowser() || typeof DOMParser === 'undefined') {
    // Fallback ultra conservador: no renderizar HTML si no hay DOM.
    // (Evitar String.prototype.replaceAll para compatibilidad con lib/targets más antiguos)
    return raw.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(raw, 'text/html')
  const body = doc.body

  const walker = doc.createTreeWalker(body, NodeFilter.SHOW_ELEMENT)
  const toProcess: Element[] = []
  // Importante: NO procesar el <body> como un nodo más; si lo "desenvolvemos"
  // movemos sus hijos fuera y `body.innerHTML` queda vacío (y no se renderiza nada).
  let current = walker.nextNode() as Element | null
  while (current) {
    toProcess.push(current)
    current = walker.nextNode() as Element | null
  }

  for (const el of toProcess) {
    const tag = el.tagName.toLowerCase()
    if (!ALLOWED_TAGS.has(tag)) {
      unwrap(el)
      continue
    }

    // Remove all attributes on allowed tags
    for (const attr of Array.from(el.attributes)) {
      el.removeAttribute(attr.name)
    }
  }

  // Limpieza extra: eliminar nodos de comentario
  const commentWalker = doc.createTreeWalker(body, NodeFilter.SHOW_COMMENT)
  const comments: Comment[] = []
  let c = commentWalker.nextNode()
  while (c) {
    comments.push(c as Comment)
    c = commentWalker.nextNode()
  }
  for (const comment of comments) comment.parentNode?.removeChild(comment)

  // Normalizar saltos: si el modelo devolvió texto "suelo", envolverlo en <p>
  const normalized = body.innerHTML.trim()
  if (normalized.length === 0) return ''
  return normalized
}


