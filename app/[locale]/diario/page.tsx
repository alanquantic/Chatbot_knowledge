'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/page-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  PlusCircle, 
  Calendar, 
  Clock, 
  TrendingUp,
  Sparkles,
  Trash2,
  BarChart3,
  Brain,
  Target,
  Zap,
  Award,
  Flame
} from 'lucide-react'
import { toast } from 'sonner'
import { useTranslations, useLocale } from 'next-intl'

interface JournalEntry {
  id: string
  date: string
  sequences: string[]
  intention: string
  moodBefore: number
  moodAfter: number
  results: string | null
  duration: number
  notes: string | null
  createdAt: string
}

interface UserStats {
  totalPractices: number
  currentStreak: number
  longestStreak: number
  totalMinutes: number
  lastPracticeDate: string | null
  level: number
  experience: number
}

interface Insight {
  title: string
  description: string
  icon: string
}

interface Suggestion {
  title: string
  description: string
  priority: 'alta' | 'media' | 'baja'
  sequences?: string[]
}

export default function DiarioPage() {
  const { data: session, status } = useSession() || {}
  const router = useRouter()
  const t = useTranslations('journal')
  const locale = useLocale()
  
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [sequences, setSequences] = useState<string[]>([''])
  const [intention, setIntention] = useState('')
  const [moodBefore, setMoodBefore] = useState(5)
  const [moodAfter, setMoodAfter] = useState(5)
  const [results, setResults] = useState('')
  const [duration, setDuration] = useState(15)
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [stats, setStats] = useState<UserStats | null>(null)
  const [insights, setInsights] = useState<Insight[]>([])
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [summary, setSummary] = useState('')
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false)
  const [isLoadingEntries, setIsLoadingEntries] = useState(false)
  const [isLoadingStats, setIsLoadingStats] = useState(false)

  useEffect(() => {
    const now = new Date()
    setDate(now.toISOString().split('T')[0])
    setTime(now.toTimeString().slice(0, 5))
  }, [])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/diario')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      loadEntries()
      loadStats()
    }
  }, [session])

  const loadEntries = async () => {
    setIsLoadingEntries(true)
    try {
      const res = await fetch('/api/journal')
      if (res.ok) {
        const data = await res.json()
        setEntries(data.entries || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoadingEntries(false)
    }
  }

  const loadStats = async () => {
    setIsLoadingStats(true)
    try {
      const res = await fetch('/api/journal/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoadingStats(false)
    }
  }

  const loadAnalysis = async () => {
    setIsLoadingAnalysis(true)
    try {
      const res = await fetch('/api/journal/analyze', { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setInsights(data.insights || [])
        setSuggestions(data.suggestions || [])
        setSummary(data.summary || data.message || '')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error(t('errors.generateAnalysis'))
    } finally {
      setIsLoadingAnalysis(false)
    }
  }

  const handleAddSequence = () => setSequences([...sequences, ''])
  const handleRemoveSequence = (index: number) => {
    if (sequences.length > 1) setSequences(sequences.filter((_, i) => i !== index))
  }
  const handleSequenceChange = (index: number, value: string) => {
    const newSequences = [...sequences]
    newSequences[index] = value
    setSequences(newSequences)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const validSequences = sequences.filter(s => s.trim() !== '')
      if (validSequences.length === 0) {
        toast.error(t('errors.addSequence'))
        return
      }
      if (!intention.trim()) {
        toast.error(t('errors.intentionRequired'))
        return
      }
      const dateTime = new Date(`${date}T${time}`)
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: dateTime.toISOString(),
          sequences: validSequences,
          intention,
          moodBefore,
          moodAfter,
          results: results || null,
          duration,
          notes: notes || null
        })
      })
      if (res.ok) {
        toast.success(t('success.practiceRegistered'))
        const now = new Date()
        setDate(now.toISOString().split('T')[0])
        setTime(now.toTimeString().slice(0, 5))
        setSequences([''])
        setIntention('')
        setMoodBefore(5)
        setMoodAfter(5)
        setResults('')
        setDuration(15)
        setNotes('')
        loadEntries()
        loadStats()
      } else {
        const data = await res.json()
        toast.error(data.error || t('errors.registerPractice'))
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error(t('errors.registerPractice'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteEntry = async (id: string) => {
    if (!confirm(t('confirm.deleteEntry'))) return
    try {
      const res = await fetch(`/api/journal/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success(t('success.entryDeleted'))
        loadEntries()
        loadStats()
      } else {
        toast.error(t('errors.deletePractice'))
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error(t('errors.deletePractice'))
    }
  }

  if (status === 'loading') {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg">{t('loading')}</p>
        </div>
      </PageLayout>
    )
  }

  if (!session) return null

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'destructive'
      case 'media': return 'default'
      case 'baja': return 'secondary'
      default: return 'default'
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString(locale === 'en' ? 'en-US' : 'es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              {t('title')}
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            {t('subtitle')}
          </p>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground text-center">
                  {t('stats.totalPractices')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-2">
                  <Target className="h-6 w-6 text-blue-500" />
                  <span className="text-3xl font-bold">{stats.totalPractices}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground text-center">
                  {t('stats.currentStreak')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-2">
                  <Flame className="h-6 w-6 text-orange-500" />
                  <span className="text-3xl font-bold">{stats.currentStreak}</span>
                  <span className="text-muted-foreground text-sm">{t('stats.days')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground text-center">
                  {t('stats.currentLevel')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <Award className="h-6 w-6 text-yellow-500" />
                    <span className="text-3xl font-bold">{stats.level}</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">{stats.experience} XP</div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground text-center">
                  {t('stats.totalTime')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-6 w-6 text-green-500" />
                  <span className="text-3xl font-bold">{stats.totalMinutes}</span>
                  <span className="text-muted-foreground text-sm">{t('stats.minutes')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="nueva" className="w-full">
          <TabsList className="grid h-auto w-full grid-cols-2 gap-2 mb-8 lg:grid-cols-4">
            <TabsTrigger value="nueva" className="flex items-center justify-center gap-1 px-2 text-xs sm:gap-2 sm:px-3 sm:text-sm">
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">{t('tabs.newEntry')}</span>
              <span className="sm:hidden">{t('tabs.newEntry').split(' ')[0]}</span>
            </TabsTrigger>
            <TabsTrigger value="entradas" className="flex items-center justify-center gap-1 px-2 text-xs sm:gap-2 sm:px-3 sm:text-sm">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">{t('tabs.myEntries')}</span>
              <span className="sm:hidden">{t('tabs.myEntries').split(' ')[0]}</span>
            </TabsTrigger>
            <TabsTrigger value="estadisticas" className="flex items-center justify-center gap-1 px-2 text-xs sm:gap-2 sm:px-3 sm:text-sm">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">{t('tabs.statistics')}</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center justify-center gap-1 px-2 text-xs sm:gap-2 sm:px-3 sm:text-sm">
              <Brain className="h-4 w-4" />
              <span>{t('tabs.insights')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nueva">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>{t('form.title')}</CardTitle>
                <CardDescription>{t('form.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">{t('form.date')}</Label>
                      <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="time">{t('form.time')}</Label>
                      <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                    </div>
                  </div>

                  <div>
                    <Label>{t('form.sequences')}</Label>
                    <div className="space-y-2 mt-2">
                      {sequences.map((seq, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder={t('form.sequencePlaceholder')}
                            value={seq}
                            onChange={(e) => handleSequenceChange(index, e.target.value)}
                          />
                          {sequences.length > 1 && (
                            <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveSequence(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button type="button" variant="outline" className="mt-2" onClick={handleAddSequence}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      {t('form.addSequence')}
                    </Button>
                  </div>

                  <div>
                    <Label htmlFor="intention">{t('form.intention')}</Label>
                    <Textarea
                      id="intention"
                      placeholder={t('form.intentionPlaceholder')}
                      value={intention}
                      onChange={(e) => setIntention(e.target.value)}
                      required
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="moodBefore">{t('form.moodBefore')}</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <Input
                          id="moodBefore"
                          type="range"
                          min="1"
                          max="10"
                          value={moodBefore}
                          onChange={(e) => setMoodBefore(parseInt(e.target.value))}
                          className="flex-1"
                        />
                        <Badge variant="outline" className="w-12 text-center flex items-center justify-center">{moodBefore}</Badge>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="moodAfter">{t('form.moodAfter')}</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <Input
                          id="moodAfter"
                          type="range"
                          min="1"
                          max="10"
                          value={moodAfter}
                          onChange={(e) => setMoodAfter(parseInt(e.target.value))}
                          className="flex-1"
                        />
                        <Badge variant="outline" className="w-12 text-center flex items-center justify-center">{moodAfter}</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="duration">{t('form.duration')}</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="results">{t('form.results')}</Label>
                    <Textarea
                      id="results"
                      placeholder={t('form.resultsPlaceholder')}
                      value={results}
                      onChange={(e) => setResults(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">{t('form.notes')}</Label>
                    <Textarea
                      id="notes"
                      placeholder={t('form.notesPlaceholder')}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? t('form.submitting') : t('form.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="entradas">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>{t('entries.title')}</CardTitle>
                <CardDescription>
                  {entries.length === 1 ? t('entries.count', { count: entries.length }) : t('entries.countPlural', { count: entries.length })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingEntries ? (
                  <p className="text-center py-8">{t('loading')}</p>
                ) : entries.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-medium mb-2">{t('entries.empty.title')}</p>
                    <p className="text-muted-foreground">{t('entries.empty.subtitle')}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {entries.map((entry) => (
                      <Card key={entry.id} className="border-2">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  {formatDate(entry.date)}
                                </span>
                                <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                                <span className="text-sm text-muted-foreground">
                                  {formatTime(entry.date)}
                                </span>
                              </div>
                              <CardTitle className="text-lg">{entry.intention}</CardTitle>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteEntry(entry.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <p className="text-sm font-medium mb-1">{t('form.sequences')}:</p>
                            <div className="flex flex-wrap gap-2">
                              {entry.sequences.map((seq, idx) => (
                                <Badge key={idx} variant="secondary">{seq}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="text-center">
                              <p className="text-muted-foreground text-xs mb-1">{t('entries.moodBefore')}</p>
                              <p className="font-bold text-base">{entry.moodBefore}/10</p>
                            </div>
                            <div className="text-center">
                              <p className="text-muted-foreground text-xs mb-1">{t('entries.moodAfter')}</p>
                              <p className="font-bold text-base">{entry.moodAfter}/10</p>
                            </div>
                            <div className="text-center">
                              <p className="text-muted-foreground text-xs mb-1">{t('entries.duration')}</p>
                              <p className="font-bold text-base">{entry.duration} min</p>
                            </div>
                          </div>

                          {entry.results && (
                            <div>
                              <p className="text-sm font-medium mb-1">{t('entries.resultsLabel')}</p>
                              <p className="text-sm text-muted-foreground">{entry.results}</p>
                            </div>
                          )}

                          {entry.notes && (
                            <div>
                              <p className="text-sm font-medium mb-1">{t('entries.notesLabel')}</p>
                              <p className="text-sm text-muted-foreground">{entry.notes}</p>
                            </div>
                          )}

                          {entry.moodAfter > entry.moodBefore && (
                            <div className="flex items-center gap-2 text-green-600">
                              <TrendingUp className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                {t('entries.moodImprovement', { points: entry.moodAfter - entry.moodBefore })}
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="estadisticas">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>{t('statistics.title')}</CardTitle>
                <CardDescription>{t('statistics.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingStats ? (
                  <p className="text-center py-8">{t('statistics.loading')}</p>
                ) : !stats ? (
                  <p className="text-center py-8 text-muted-foreground">{t('statistics.noStats')}</p>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2">
                          <Flame className="h-5 w-5 text-orange-500" />
                          {t('statistics.streaks')}
                        </h3>
                        <div className="space-y-1 pl-7">
                          <p className="text-sm">{t('statistics.currentStreak')}: <span className="font-bold">{stats.currentStreak} {t('stats.days')}</span></p>
                          <p className="text-sm">{t('statistics.longestStreak')}: <span className="font-bold">{stats.longestStreak} {t('stats.days')}</span></p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2">
                          <Award className="h-5 w-5 text-yellow-500" />
                          {t('statistics.progress')}
                        </h3>
                        <div className="space-y-1 pl-7">
                          <p className="text-sm">{t('statistics.level')}: <span className="font-bold">{stats.level}</span></p>
                          <p className="text-sm">{t('statistics.experience')}: <span className="font-bold">{stats.experience} XP</span></p>
                          <p className="text-sm text-muted-foreground">
                            {t('statistics.nextLevel')}: {(stats.level * 100) - stats.experience} XP
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2">
                          <Target className="h-5 w-5 text-blue-500" />
                          {t('statistics.practices')}
                        </h3>
                        <div className="space-y-1 pl-7">
                          <p className="text-sm">{t('statistics.total')}: <span className="font-bold">{stats.totalPractices}</span></p>
                          <p className="text-sm">{t('statistics.average')}: <span className="font-bold">
                            {stats.totalPractices > 0 
                              ? (stats.totalMinutes / stats.totalPractices).toFixed(1) 
                              : 0} {t('statistics.perPractice')}
                          </span></p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2">
                          <Clock className="h-5 w-5 text-green-500" />
                          {t('statistics.time')}
                        </h3>
                        <div className="space-y-1 pl-7">
                          <p className="text-sm">{t('statistics.totalMinutes')}: <span className="font-bold">{stats.totalMinutes} min</span></p>
                          <p className="text-sm">
                            {t('statistics.equivalent')}: <span className="font-bold">{(stats.totalMinutes / 60).toFixed(1)} {t('statistics.hours')}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {stats.lastPracticeDate && (
                      <div className="pt-4 border-t">
                        <p className="text-sm text-muted-foreground">
                          {t('statistics.lastPractice')}: {formatDate(stats.lastPracticeDate)}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  {t('insights.title')}
                </CardTitle>
                <CardDescription>{t('insights.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button 
                  onClick={loadAnalysis} 
                  disabled={isLoadingAnalysis || entries.length === 0}
                  className="w-full"
                >
                  {isLoadingAnalysis ? t('insights.generating') : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      {t('insights.generateButton')}
                    </>
                  )}
                </Button>

                {summary && (
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border-2 border-purple-200 dark:border-purple-800">
                    <p className="text-sm">{summary}</p>
                  </div>
                )}

                {insights.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      {t('insights.discoveredInsights')}
                    </h3>
                    <div className="space-y-3">
                      {insights.map((insight, idx) => (
                        <Card key={idx} className="border-2">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <span>{insight.icon}</span>
                              {insight.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">{insight.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {suggestions.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-500" />
                      {t('insights.personalizedSuggestions')}
                    </h3>
                    <div className="space-y-3">
                      {suggestions.map((suggestion, idx) => (
                        <Card key={idx} className="border-2">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-base">{suggestion.title}</CardTitle>
                              <Badge variant={getPriorityColor(suggestion.priority)}>{t(`insights.priority.${suggestion.priority === 'alta' ? 'high' : suggestion.priority === 'media' ? 'medium' : 'low'}` as any)}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                            {suggestion.sequences && suggestion.sequences.length > 0 && (
                              <div className="flex flex-wrap gap-2 pt-2">
                                {suggestion.sequences.map((seq, seqIdx) => (
                                  <Badge key={seqIdx} variant="outline">{seq}</Badge>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {!isLoadingAnalysis && entries.length === 0 && (
                  <div className="text-center py-8">
                    <Brain className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-medium mb-2">{t('insights.empty.title')}</p>
                    <p className="text-muted-foreground">
                      {t('insights.empty.subtitle')}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
