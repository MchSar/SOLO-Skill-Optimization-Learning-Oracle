
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BrainCircuit, LoaderCircle, RefreshCw, Sparkles } from 'lucide-react'

const API_URL = 'http://127.0.0.1:8000/api/ai/roadmap'

export default function AIRoadmap({ learnerContext }) {
  const [roadmap, setRoadmap] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateRoadmap = async () => {
    if (loading) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          learner_context: learnerContext
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Roadmap generation failed.')
      }

      setRoadmap(data.roadmap)
    } catch (err) {
      setError(err.message || 'Unable to connect to local AI.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <section className="rounded-2xl bg-slate-950 p-7 text-white">
        <div className="flex items-center gap-3">
          <BrainCircuit size={25} className="text-blue-300" />
          <div>
            <h1 className="text-xl font-bold">AI Learning Roadmap</h1>
            <p className="mt-1 text-xs text-slate-300">
              Your personalized 30-day learning journey
            </p>
          </div>
          <span className="ml-auto rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-bold text-emerald-300">
            LOCAL AI
          </span>
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-300">
          Generate a study plan based on your career track,
          assessment results, and practical mission performance.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold">Your AI-generated plan</h2>
            <p className="mt-1 text-xs text-slate-500">
              Powered by Qwen 2.5 through Ollama
            </p>
          </div>

          <button
            onClick={generateRoadmap}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? (
              <LoaderCircle size={15} className="animate-spin" />
            ) : roadmap ? (
              <RefreshCw size={15} />
            ) : (
              <Sparkles size={15} />
            )}
            {loading
              ? 'Generating...'
              : roadmap
                ? 'Regenerate Roadmap'
                : 'Generate My Roadmap'}
          </button>
        </div>

        {error && (
          <p className="mt-5 rounded-xl bg-rose-50 p-4 text-xs text-rose-700">
            {error}
          </p>
        )}

        {loading && (
          <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
            <LoaderCircle size={18} className="animate-spin" />
            Your local AI is creating your study plan...
          </div>
        )}

        {!roadmap && !loading && (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-200 p-8 text-center">
            <Sparkles size={28} className="mx-auto text-blue-600" />
            <h3 className="mt-3 text-sm font-bold">
              Your personalized roadmap is one click away
            </h3>
            <p className="mt-2 text-xs text-slate-500">
              Generate a 4-week learning plan tailored to your skills.
            </p>
          </div>
        )}

        {roadmap && (
          <article className="mt-7 whitespace-pre-wrap break-words rounded-xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
            {roadmap}
          </article>
        )}
      </section>
    </div>
  )
}
