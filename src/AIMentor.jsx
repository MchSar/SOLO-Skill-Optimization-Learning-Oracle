
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BrainCircuit, Send, Bot, User, LoaderCircle, Sparkles } from 'lucide-react'

const API_URL = 'http://127.0.0.1:8000/api/ai/chat'

export default function AIMentor({ learnerContext }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! I'm your S.O.L.O. AI Mentor. I know your learning context and I'm ready to help you understand concepts, improve your skills, and plan your career. What would you like to work on?"
    }
  ])

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  
const sendMessage = async (event) => {
  event.preventDefault()

  const message = input.trim()
  if (!message || loading) return

  setInput('')
  setError('')

  setMessages(previous => [
    ...previous,
    { role: 'user', content: message }
  ])

  setLoading(true)

  // Detect requests for personalized learning roadmaps
  const roadmapIntent =
    /\b(roadmap|study plan|learning plan|study schedule|learning schedule|30.day plan|weekly plan)\b/i.test(message)

  try {
    const response = await fetch(
      roadmapIntent
        ? 'http://127.0.0.1:8000/api/ai/roadmap'
        : 'http://127.0.0.1:8000/api/ai/chat',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          roadmapIntent
            ? { learner_context: learnerContext }
            : {
                message,
                context: JSON.stringify(learnerContext)
              }
        )
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.detail || 'AI request failed.')
    }

    const aiReply = roadmapIntent
      ? `✨ Your personalized AI learning roadmap is ready!\n\n${data.roadmap}`
      : data.reply

    setMessages(previous => [
      ...previous,
      {
        role: 'assistant',
        content: aiReply
      }
    ])

  } catch (err) {
    setError(
      err.message || 'Could not connect to the local AI.'
    )
  } finally {
    setLoading(false)
  }
}

  const suggestions = [
    'Explain machine learning simply.',
    'How can I improve my Python skills?',
    'Help me understand my skill gaps.'
  ]

  return (
    <div className="space-y-5">
      <section className="rounded-2xl bg-slate-950 p-6 text-white sm:p-7">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/20 text-blue-300">
            <BrainCircuit size={23} />
          </div>

          <div>
            <h1 className="text-lg font-bold">S.O.L.O. AI Mentor</h1>
            <p className="mt-1 text-xs text-slate-300">
              Your personal learning and career assistant
            </p>
          </div>

          <span className="ml-auto rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold text-emerald-300">
            LOCAL AI
          </span>
        </div>

        <p className="mt-5 max-w-xl text-sm leading-6 text-slate-300">
          Ask questions, explore difficult concepts, and get guidance
          based on your S.O.L.O. learning profile.
        </p>
      </section>

      <section className="flex min-h-[480px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center gap-2 border-b border-slate-100 p-4">
          <Sparkles size={16} className="text-blue-600" />
          <span className="text-sm font-bold">Mentor conversation</span>
          <span className="ml-auto text-[10px] text-slate-400">
            Qwen 2.5 · Ollama
          </span>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
          {messages.map((item, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                item.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                item.role === 'user'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-slate-950 text-white'
              }`}>
                {item.role === 'user'
                  ? <User size={15} />
                  : <Bot size={16} />}
              </div>

              <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${
                item.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-50 text-slate-700'
              }`}>
                {item.role === 'assistant' ? (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      h1: ({children}) => (
        <h1 className="mb-4 mt-5 text-xl font-bold text-slate-900">
          {children}
        </h1>
      ),
      h2: ({children}) => (
        <h2 className="mb-3 mt-5 text-lg font-bold text-slate-900">
          {children}
        </h2>
      ),
      h3: ({children}) => (
        <h3 className="mb-2 mt-4 text-sm font-bold text-slate-900">
          {children}
        </h3>
      ),
      p: ({children}) => (
        <p className="mb-3 leading-7">{children}</p>
      ),
      ul: ({children}) => (
        <ul className="mb-4 ml-5 list-disc space-y-2">{children}</ul>
      ),
      ol: ({children}) => (
        <ol className="mb-4 ml-5 list-decimal space-y-2">{children}</ol>
      ),
      li: ({children}) => (
        <li className="pl-1 leading-6">{children}</li>
      ),
      strong: ({children}) => (
        <strong className="font-bold text-slate-950">{children}</strong>
      )
    }}
  >
    {item.content}
  </ReactMarkdown>
) : (
  item.content
)}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <LoaderCircle size={16} className="animate-spin" />
              S.O.L.O. is thinking...
            </div>
          )}
        </div>

        {error && (
          <div className="mx-4 mb-3 rounded-xl bg-rose-50 p-3 text-xs text-rose-700">
            {error}
          </div>
        )}

        <div className="border-t border-slate-100 p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestions.map(suggestion => (
              <button
                key={suggestion}
                type="button"
                disabled={loading}
                onClick={() => setInput(suggestion)}
                className="rounded-full border border-slate-200 px-3 py-2 text-[10px] text-slate-600 hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              value={input}
              onChange={event => setInput(event.target.value)}
              disabled={loading}
              placeholder="Ask your AI mentor anything..."
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-950 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              aria-label="Send message"
            >
              <Send size={17} />
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
