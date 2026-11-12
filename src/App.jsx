import AIMentor from './AIMentor'
import AIRoadmap from './AIRoadmap'
import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Award, Target, BarChart3, Code2, BriefcaseBusiness, BookOpen, LayoutDashboard, Activity, LogOut, Sparkles, Database, FileSpreadsheet, Play, CheckCircle2, AlertTriangle, RotateCcw, ClipboardCheck, Lightbulb, Clock3 } from 'lucide-react'
import { careerTracks, questionsByCareer } from './data/demo'

const KEY = 'solo-prototype-v2'
const readSaved = () => { try { return JSON.parse(localStorage.getItem(KEY) || 'null') } catch { return null } }
const save = value => localStorage.setItem(KEY, JSON.stringify(value))
const summarizeTopics = (questions, answers) => [...new Set(questions.map(q => q.topic))].map(topic => { const group = questions.filter(q => q.topic === topic); const correct = group.filter(q => answers[q.id] === q.answer).length; return { topic, correct, total: group.length, score: Math.round(correct / group.length * 100), } })

function Field({ label, children }) { return <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-700">{label}</span>{children}</label> }
function Brand() { return <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-lg font-bold text-white">S</div><div><div className="text-lg font-bold tracking-tight text-slate-950">S.O.L.O.</div><div className="text-[10px] font-semibold uppercase tracking-[.17em] text-slate-400">Skill Optimization</div></div></div> }

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState({ name: '', education: 'Undergraduate', institution: '', interests: '' })
  const [career, setCareer] = useState('ml-engineer')
  const [answers, setAnswers] = useState({})
  const [error, setError] = useState('')
  const selected = careerTracks.find(c => c.id === career)
  const activeQuestions = questionsByCareer[career]
  const score = useMemo(() => activeQuestions.reduce((n, q) => n + (answers[q.id] === q.answer ? 1 : 0), 0), [answers, career])
  const update = (key, value) => setProfile(p => ({ ...p, [key]: value }))
  const submitProfile = e => { e.preventDefault(); if (!profile.name.trim() || !profile.institution.trim()) { setError('Please enter your name and institution.'); return } setError(''); setStep(2) }
  const finish = () => {
    const assessment = { score, total: activeQuestions.length, percentage: Math.round(score / activeQuestions.length * 100), topics: summarizeTopics(activeQuestions, answers), completedAt: new Date().toISOString() }
    onComplete({ profile, career, assessment })
  }
  return <div className="min-h-screen bg-[#f7f8fc] px-4 py-6 sm:px-8 sm:py-10"><div className="mx-auto max-w-5xl"><div className="mb-9 flex items-center justify-between"><Brand/><span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-500">PROTOTYPE 1.0</span></div><div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[.78fr_1.22fr]"><aside className="relative hidden min-h-[620px] flex-col justify-between overflow-hidden bg-slate-950 p-9 text-white lg:flex"><div className="relative z-10"><div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-blue-200"><Sparkles size={12}/> Start with your potential</div><h1 className="mt-8 text-3xl font-semibold leading-tight">Your next career step starts with <span className="text-blue-300">proof.</span></h1><p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">Tell us where you're starting. S.O.L.O. will help you practise, understand your skill gaps and plan what to improve.</p></div><div className="relative z-10 rounded-2xl border border-white/10 bg-white/5 p-5"><Target className="mb-3 text-blue-300" size={22}/><p className="text-sm font-semibold">Level up. Prove yourself.</p><p className="mt-1 text-xs leading-5 text-slate-400">A practical approach to career development.</p></div><div className="absolute -right-20 top-32 h-72 w-72 rounded-full border border-white/10"/><div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-blue-700/20 blur-3xl"/></aside><main className="p-5 sm:p-9 lg:p-10"><div className="mb-8"><div className="mb-3 flex justify-between text-[11px] font-semibold text-slate-400"><span>GETTING STARTED</span><span>STEP {step} OF 3</span></div><div className="mb-4 flex gap-2">{[1,2,3].map(n=><div key={n} className={`h-1.5 flex-1 rounded-full ${n <= step ? 'bg-blue-600' : 'bg-slate-200'}`}/>)}</div><div className="grid grid-cols-3 gap-2 text-[10px] sm:text-xs"><span className={step===1?'font-bold text-blue-700':'text-slate-400'}>1. Your profile</span><span className={step===2?'font-bold text-blue-700':'text-slate-400'}>2. Career direction</span><span className={step===3?'font-bold text-blue-700':'text-slate-400'}>3. Skill assessment</span></div></div>
{step===1 && <form onSubmit={submitProfile}><p className="text-xs font-semibold text-blue-700">LET'S GET TO KNOW YOU</p><h2 className="mt-2 text-2xl font-bold text-slate-950">Create your profile</h2><p className="mt-2 mb-6 text-sm text-slate-500">A few details help us shape your starting experience.</p><div className="space-y-4"><Field label="Full name"><input className="field" value={profile.name} onChange={e=>update('name',e.target.value)} placeholder="e.g. Alex Morgan"/></Field><Field label="Education level"><select className="field" value={profile.education} onChange={e=>update('education',e.target.value)}><option>Undergraduate</option><option>Postgraduate</option><option>Graduate</option><option>Working professional</option><option>Other</option></select></Field><Field label="College / Institution"><input className="field" value={profile.institution} onChange={e=>update('institution',e.target.value)} placeholder="Your college or institution"/></Field><Field label="Interests (optional)"><input className="field" value={profile.interests} onChange={e=>update('interests',e.target.value)} placeholder="e.g. Python, data science, problem solving"/></Field></div>{error && <p className="mt-3 text-xs text-rose-600">{error}</p>}<button className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white hover:bg-blue-700">Continue <ArrowRight size={16}/></button><p className="mt-4 text-center text-[10px] text-slate-400">Prototype mode: details are saved in this browser only.</p></form>}
{step===2 && <div><p className="text-xs font-semibold text-blue-700">CHOOSE YOUR DIRECTION</p><h2 className="mt-2 text-2xl font-bold text-slate-950">What role interests you?</h2><p className="mt-2 mb-6 text-sm text-slate-500">Choose one career track for your first assessment.</p><div className="space-y-3">{careerTracks.map((c,i)=><button key={c.id} onClick={()=>{setCareer(c.id);setAnswers({})}} className={`w-full rounded-2xl border p-4 text-left ${career===c.id?'border-blue-500 bg-blue-50/70 ring-2 ring-blue-100':'border-slate-200 hover:border-slate-300'}`}><div className="flex items-start gap-3"><div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${career===c.id?'bg-blue-600 text-white':'bg-slate-100 text-slate-500'}`}>{i===0?<Target size={19}/>:i===1?<BarChart3 size={19}/>:<Code2 size={19}/>}</div><div className="min-w-0 flex-1"><div className="flex items-center justify-between"><h3 className="text-sm font-bold text-slate-900">{c.title}</h3>{career===c.id&&<span className="grid h-5 w-5 place-items-center rounded-full bg-blue-600 text-white"><Check size={12}/></span>}</div><p className="mt-1 text-xs leading-5 text-slate-500">{c.description}</p><div className="mt-3 flex flex-wrap gap-1.5">{c.skills.map(s=><span key={s} className="rounded-full bg-white px-2 py-1 text-[9px] text-slate-500">{s}</span>)}</div></div></div></button>)}</div><div className="mt-7 flex gap-3"><button onClick={()=>setStep(1)} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600"><ArrowLeft size={15}/> Back</button><button onClick={()=>setStep(3)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">Continue to assessment <ArrowRight size={15}/></button></div></div>}
{step===3 && <div><p className="text-xs font-semibold text-blue-700">BASELINE CHECK</p><h2 className="mt-2 text-2xl font-bold text-slate-950">Let's map your starting point</h2><p className="mt-2 mb-5 text-sm text-slate-500">25 questions across five skill areas for {selected.title}. This is a baseline, not an exam.</p><div className="max-h-[390px] space-y-5 overflow-y-auto pr-1">{activeQuestions.map((q,i)=><div key={q.id} className="rounded-2xl border border-slate-200 p-4"><div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-blue-700">QUESTION {i+1} · {q.topic}</div><h3 className="text-sm font-semibold leading-6 text-slate-900">{q.prompt}</h3><div className="mt-3 grid gap-2 sm:grid-cols-2">{q.options.map((opt,j)=><button key={opt} onClick={()=>setAnswers(a=>({...a,[q.id]:j}))} className={`rounded-xl border px-3 py-2.5 text-left text-xs ${answers[q.id]===j?'border-blue-500 bg-blue-50 font-semibold text-blue-800':'border-slate-200 text-slate-600 hover:bg-slate-50'}`}><span className="mr-2 text-slate-400">{String.fromCharCode(65+j)}.</span>{opt}</button>)}</div></div>)}</div><div className="mt-4 flex justify-between text-xs text-slate-500"><span>{Object.keys(answers).length} of {activeQuestions.length} answered</span><span>Score revealed after submission</span></div><div className="mt-5 flex gap-3"><button onClick={()=>setStep(2)} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600"><ArrowLeft size={15}/> Back</button><button disabled={Object.keys(answers).length!==activeQuestions.length} onClick={finish} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400">Finish assessment <Check size={15}/></button></div></div>}
</main></div><p className="mt-5 text-center text-[10px] text-slate-400">S.O.L.O. · Skill Optimization & Learning Oracle</p></div></div>
}


const missionRows = [
  { id: 'E-101', name: 'Asha Rao', department: 'Engineering', experience: '2', salary: '45000', rating: '4' },
  { id: 'E-102', name: 'Kabir Das', department: 'engineering', experience: '3', salary: '52000', rating: '4' },
  { id: 'E-103', name: 'Meera Sen', department: 'HR', experience: '1', salary: '—', rating: '3' },
  { id: 'E-104', name: 'Rohan Paul', department: 'Sales', experience: '5', salary: '61000', rating: '5' },
  { id: 'E-105', name: 'Isha Roy', department: 'Sales', experience: '4', salary: '58000', rating: '4' },
  { id: 'E-105', name: 'Isha Roy', department: 'Sales', experience: '4', salary: '58000', rating: '4' },
  { id: 'E-106', name: 'Nila Bose', department: 'Engineering', experience: '-1', salary: '49000', rating: '2' },
  { id: 'E-107', name: 'Dev Shah', department: 'Marketing', experience: '3', salary: '—', rating: '4' },
  { id: 'E-108', name: 'Sara Khan', department: 'marketing', experience: '6', salary: '72000', rating: '5' },
]

function ModelBuilderMission({ attempt, onSubmit, onBack }) {
  const options = {
    target: [['churn','Whether the customer leaves (churn)'],['customer_id','Customer ID'],['monthly_charges','Monthly charges']],
    features: [['valid','Tenure, monthly charges, contract type and support tickets'],['id_only','Customer ID only'],['leakage','Churn status and cancellation date']],
    split: [['stratified','Stratified train/test split (80/20)'],['train_only','Use all records for training only'],['random_no_check','Random split without checking class balance']],
    model: [['logistic','Logistic Regression as a baseline classifier'],['linear','Linear Regression for a yes/no outcome'],['memorize','Memorize training labels and report training accuracy']],
  }
  const questions = [
    {key:'target',title:'1. Define the prediction target',desc:'The company wants to identify customers likely to leave within the next 30 days.'},
    {key:'features',title:'2. Select useful input features',desc:'Choose information available before prediction. Avoid identifiers and future information.'},
    {key:'split',title:'3. Prepare the evaluation split',desc:'There are fewer churn cases than non-churn cases. You need a fair estimate on unseen data.'},
    {key:'model',title:'4. Choose a baseline model',desc:'This is a binary classification problem. Start with a simple, interpretable baseline.'},
  ]
  const rubric = [
    {key:'target',label:'Prediction target',correct:'churn',explanation:'Churn is the outcome the business wants to predict. Customer ID is an identifier, not the target.'},
    {key:'features',label:'Feature selection',correct:'valid',explanation:'Use relevant information known at prediction time. Exclude IDs and future or target-leaking fields.'},
    {key:'split',label:'Train/test strategy',correct:'stratified',explanation:'A stratified split preserves approximate class balance. Keep the test set separate until evaluation.'},
    {key:'model',label:'Baseline model',correct:'logistic',explanation:'Logistic Regression is a suitable, interpretable baseline for a binary classification task.'},
  ]
  const [answers,setAnswers] = useState(attempt?.answers || {target:'',features:'',split:'',model:''})
  const [result,setResult] = useState(attempt || null)
  const submit = () => {
    const criteria = rubric.map(item=>({...item,selected:answers[item.key],passed:answers[item.key]===item.correct,points:25}))
    const score = criteria.reduce((sum,item)=>sum+(item.passed?25:0),0)
    const submission = {missionId:'ML-02',title:'ML Model Builder',score,total:100,completedAt:new Date().toISOString(),answers,criteria}
    setResult(submission); onSubmit(submission)
  }
  const restart = () => {setAnswers({target:'',features:'',split:'',model:''});setResult(null)}
  return <div className="space-y-5">
    <div><button onClick={onBack} className="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-700"><ArrowLeft size={14}/> Back to missions</button><p className="text-xs font-bold uppercase tracking-wider text-blue-700">MISSION 02 · MODEL DEVELOPMENT</p><h1 className="mt-1 text-2xl font-bold text-slate-950">ML Model Builder</h1><p className="mt-2 text-sm text-slate-500">Act as a junior ML engineer and design a responsible first model for a customer-retention problem.</p></div>
    <section className="rounded-2xl bg-slate-950 p-6 text-white"><div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-wider text-blue-300">BUSINESS SCENARIO</span><span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-slate-200">INTERMEDIATE · 20–30 MIN</span></div><h2 className="mt-3 text-lg font-bold">Predict customer churn</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">A subscription company wants to identify customers at risk of cancelling in the next 30 days. Historical records include tenure, monthly charges, contract type, support tickets and churn outcome. Define the target, select safe features, choose an evaluation split and select a baseline model.</p><div className="mt-5 grid gap-3 sm:grid-cols-3">{[['DATASET','customer_churn.csv'],['TASK','Binary classification'],['OUTPUT','Model design plan']].map(([a,b])=><div key={a} className="rounded-xl bg-white/10 p-3"><p className="text-[10px] text-slate-400">{a}</p><p className="mt-1 text-xs font-bold">{b}</p></div>)}</div></section>
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><h2 className="text-sm font-bold text-slate-900">Build your model plan</h2><p className="mt-1 text-xs text-slate-500">Choose one answer for each decision. Your score and explanations appear after submission.</p>
      {result ? <div className="mt-5 space-y-4"><div className="rounded-2xl bg-slate-950 p-6 text-white"><p className="text-xs font-bold uppercase tracking-wider text-blue-300">MISSION RESULT</p><div className="mt-2 flex items-end gap-2"><span className="text-4xl font-bold">{result.score}</span><span className="pb-1 text-sm text-slate-400">/ 100 points</span></div><p className="mt-2 text-sm text-slate-300">{result.score===100?'Excellent model-design decisions. Your plan is suitable for a careful baseline experiment.':'Review the feedback below, then try again to strengthen your model-design decisions.'}</p></div><div className="space-y-3">{result.criteria.map(item=><div key={item.key} className="rounded-xl border border-slate-200 p-4"><div className="flex items-center justify-between gap-2"><p className="text-xs font-bold text-slate-800">{item.label}</p><span className={`text-xs font-bold ${item.passed?'text-emerald-600':'text-rose-600'}`}>{item.passed?'+25 points':'0 points'}</span></div><p className="mt-2 text-xs leading-5 text-slate-500">{item.explanation}</p>{!item.passed&&<p className="mt-2 text-xs font-semibold text-blue-700">Recommended: {options[item.key].find(option=>option[0]===item.correct)?.[1]}</p>}</div>)}</div><button onClick={restart} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"><RotateCcw size={14}/> Try again</button></div> : <div className="mt-5 space-y-4">{questions.map(question=><div key={question.key} className="rounded-xl border border-slate-200 p-4"><h3 className="text-xs font-bold text-slate-900">{question.title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{question.desc}</p><div className="mt-3 grid gap-2">{options[question.key].map(([value,label])=><label key={value} className={`flex cursor-pointer items-start gap-2 rounded-lg border p-3 text-xs leading-5 ${answers[question.key]===value?'border-blue-400 bg-blue-50':'border-slate-200 hover:border-slate-300'}`}><input type="radio" name={question.key} checked={answers[question.key]===value} onChange={()=>setAnswers(current=>({...current,[question.key]:value}))} className="mt-0.5 accent-blue-600"/><span className="text-slate-700">{label}</span></label>)}</div></div>)}<button onClick={submit} disabled={questions.some(question=>!answers[question.key])} className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400">Submit model plan <ArrowRight size={15}/></button><p className="text-center text-[10px] text-slate-400">Complete all four decisions before submitting.</p></div>}
    </section>
  </div>
}


function ModelEvaluatorMission({ attempt, onSubmit, onBack }) {
  const [answers, setAnswers] = useState(attempt?.answers || {metric:'',threshold:'',validation:'',reporting:''})
  const [result, setResult] = useState(attempt || null)
  const questions = [
    {key:'metric', title:'1. Choose the primary evaluation metric', desc:'Only 8% of customers churn. The model has 94% accuracy but misses most customers who actually churn.', options:[['accuracy','Accuracy alone'],['recall','Recall, alongside precision'],['specificity','Specificity only']], correct:'recall', explanation:'With a rare positive class, accuracy can hide missed churners. Recall measures how many actual churners are found; pair it with precision to understand false alarms.'},
    {key:'threshold', title:'2. Respond to missed churners', desc:'The current threshold catches too few churners. The business can tolerate some additional follow-up calls.', options:[['lower','Evaluate a lower decision threshold and monitor precision'],['higher','Raise the threshold further'],['ignore','Keep the threshold without checking errors']], correct:'lower', explanation:'A lower threshold often increases recall but can also increase false positives. Compare the trade-off on validation data and choose based on business costs.'},
    {key:'validation', title:'3. Tune the model responsibly', desc:'You need to compare thresholds and model settings before the final report.', options:[['test','Repeatedly tune using the test set'],['validation','Tune on training/validation data and reserve the test set for final evaluation'],['train','Report training performance only']], correct:'validation', explanation:'Use training and validation data for model selection. Keep the test set untouched until the final evaluation to reduce optimistic bias.'},
    {key:'reporting', title:'4. Communicate model performance', desc:'The operations team needs to understand how useful and risky the model is.', options:[['accuracy_only','Report only the 94% accuracy'],['matrix','Show a confusion matrix, precision, recall and limitations'],['guarantee','Promise the model will identify every churner']], correct:'matrix', explanation:'A confusion matrix and class-aware metrics show both missed churners and false alarms. Explain limitations and that predictions are not guarantees.'},
  ]
  const submit = () => {
    const criteria = questions.map(q => ({key:q.key,label:q.title.replace(/^\d+\. /,''),selected:answers[q.key],correct:answers[q.key]===q.correct,points:25,explanation:q.explanation,recommended:q.options.find(o=>o[0]===q.correct)[1]}))
    const score = criteria.reduce((sum,item)=>sum+(item.correct?25:0),0)
    const submission = {missionId:'ML-03',title:'Model Evaluator',score,total:100,completedAt:new Date().toISOString(),answers,criteria}
    setResult(submission); onSubmit(submission)
  }
  const restart = () => {setAnswers({metric:'',threshold:'',validation:'',reporting:''});setResult(null)}
  return <div className="space-y-5">
    <div><button onClick={onBack} className="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-700"><ArrowLeft size={14}/> Back to missions</button><p className="text-xs font-bold uppercase tracking-wider text-blue-700">MISSION 03 · MODEL EVALUATION</p><h1 className="mt-1 text-2xl font-bold text-slate-950">Model Evaluator</h1><p className="mt-2 text-sm text-slate-500">Evaluate a churn model responsibly and communicate what its metrics really mean.</p></div>
    <section className="rounded-2xl bg-slate-950 p-6 text-white"><div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-wider text-blue-300">BUSINESS SCENARIO</span><span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-slate-200">INTERMEDIATE · 15–20 MIN</span></div><h2 className="mt-3 text-lg font-bold">Is the churn model actually useful?</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">A subscription company tests a model on a dataset where only 8% of customers churn. The model reports 94% accuracy, but it detects only 30% of actual churners. Your task is to choose meaningful metrics, manage the decision threshold, protect the test set and explain the result to the business.</p><div className="mt-5 grid gap-3 sm:grid-cols-3">{[['POSITIVE CLASS','8% churn'],['MODEL ACCURACY','94%'],['CHURN RECALL','30%']].map(([a,b])=><div key={a} className="rounded-xl bg-white/10 p-3"><p className="text-[10px] text-slate-400">{a}</p><p className="mt-1 text-xs font-bold">{b}</p></div>)}</div></section>
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><h2 className="text-sm font-bold text-slate-900">Make your evaluation decisions</h2><p className="mt-1 text-xs text-slate-500">Choose one answer for each decision. Feedback appears after submission.</p>
      {result ? <div className="mt-5 space-y-4"><div className="rounded-2xl bg-slate-950 p-6 text-white"><p className="text-xs font-bold uppercase tracking-wider text-blue-300">MISSION RESULT</p><div className="mt-2 flex items-end gap-2"><span className="text-4xl font-bold">{result.score}</span><span className="pb-1 text-sm text-slate-400">/ 100 points</span></div><p className="mt-2 text-sm text-slate-300">{result.score===100?'Excellent evaluation plan. You considered class imbalance, threshold trade-offs and responsible testing.':'Review the feedback below to strengthen your model-evaluation decisions.'}</p></div><div className="space-y-3">{result.criteria.map(item=><div key={item.key} className="rounded-xl border border-slate-200 p-4"><div className="flex items-center justify-between gap-2"><p className="text-xs font-bold text-slate-800">{item.label}</p><span className={`text-xs font-bold ${item.correct?'text-emerald-600':'text-rose-600'}`}>{item.correct?'+25 points':'0 points'}</span></div><p className="mt-2 text-xs leading-5 text-slate-500">{item.explanation}</p>{!item.correct&&<p className="mt-2 text-xs font-semibold text-blue-700">Recommended: {item.recommended}</p>}</div>)}</div><button onClick={restart} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"><RotateCcw size={14}/> Try again</button></div> : <div className="mt-5 space-y-4">{questions.map(q=><div key={q.key} className="rounded-xl border border-slate-200 p-4"><h3 className="text-xs font-bold text-slate-900">{q.title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{q.desc}</p><div className="mt-3 grid gap-2">{q.options.map(([value,label])=><label key={value} className={`flex cursor-pointer items-start gap-2 rounded-lg border p-3 text-xs leading-5 ${answers[q.key]===value?'border-blue-400 bg-blue-50':'border-slate-200 hover:border-slate-300'}`}><input type="radio" name={`eval-${q.key}`} checked={answers[q.key]===value} onChange={()=>setAnswers(current=>({...current,[q.key]:value}))} className="mt-0.5 accent-blue-600"/><span className="text-slate-700">{label}</span></label>)}</div></div>)}<button onClick={submit} disabled={questions.some(q=>!answers[q.key])} className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400">Submit evaluation plan <ArrowRight size={15}/></button><p className="text-center text-[10px] text-slate-400">Complete all four decisions before submitting.</p></div>}
    </section>
  </div>
}



function BugHunterMission({ attempt, onSubmit, onBack }) {
  const [answers, setAnswers] = useState(attempt?.answers || {loop:'',boundary:'',async:'',test:''})
  const [result, setResult] = useState(attempt || null)
  const questions = [
    {key:'loop',title:'1. Fix the infinite loop',desc:'A user clicks “Load more”, but the page freezes. Identify the bug.',code:'let page = 1;\nwhile (page <= 3) {\n  fetchPage(page);\n}',options:[['increment','Increment page inside the loop'],['remove','Remove the loop condition'],['delay','Add a longer timeout']],correct:'increment',explanation:'The value of page never changes, so page <= 3 remains true forever. Increment page after each fetch (or use a bounded for loop).',fix:'while (page <= 3) { fetchPage(page); page += 1; }'},
    {key:'boundary',title:'2. Correct the array boundary',desc:'The function should return the last item, but it returns undefined.',code:'function lastItem(items) {\n  return items[items.length];\n}',options:[['minus','Use items[items.length - 1]'],['zero','Use items[0]'],['length','Keep items.length']],correct:'minus',explanation:'JavaScript arrays are zero-indexed. The final valid index is length - 1; index length is outside the array.',fix:'return items[items.length - 1]'},
    {key:'async',title:'3. Handle asynchronous data',desc:'The log prints before the request finishes. What is the best fix?',code:'async function showUsers() {\n  const users = fetchUsers();\n  console.log(users);\n}',options:[['await','Await fetchUsers() before logging'],['string','Convert users to a string'],['repeat','Call fetchUsers() twice']],correct:'await',explanation:'An async function returns a Promise. Await the request to get its resolved value before using the data.',fix:'const users = await fetchUsers();\nconsole.log(users);'},
    {key:'test',title:'4. Choose a useful regression test',desc:'You fixed a discount function. Which test best protects against this bug returning?',code:'function discount(price, rate) {\n  return price - price * rate;\n}',options:[['normal','Test only one typical price'],['edges','Test zero, normal and boundary inputs'],['visual','Check only the button colour']],correct:'edges',explanation:'Regression tests should cover representative and boundary cases. For example, zero price, a normal price, and valid rate boundaries help catch future mistakes.',fix:'Test discount(0, 0.1), discount(100, 0.1), and the allowed rate boundaries.'},
  ]
  const submit = () => {
    const criteria = questions.map(q => ({key:q.key,label:q.title.replace(/^\d+\. /,''),selected:answers[q.key],correct:answers[q.key]===q.correct,points:25,explanation:q.explanation,recommended:q.options.find(o=>o[0]===q.correct)[1],fix:q.fix}))
    const score = criteria.reduce((sum,item)=>sum+(item.correct?25:0),0)
    const submission = {missionId:'SD-05',title:'Bug Hunter',score,total:100,completedAt:new Date().toISOString(),answers,criteria}
    setResult(submission); onSubmit(submission)
  }
  const restart = () => { setAnswers({loop:'',boundary:'',async:'',test:''}); setResult(null) }
  return <div className="space-y-5">
    <div><button onClick={onBack} className="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-700"><ArrowLeft size={14}/> Back to missions</button><p className="text-xs font-bold uppercase tracking-wider text-blue-700">MISSION 05 · SOFTWARE DEVELOPMENT</p><h1 className="mt-1 text-2xl font-bold text-slate-950">Bug Hunter</h1><p className="mt-2 text-sm text-slate-500">Investigate common JavaScript bugs, choose safe fixes and think about regression testing.</p></div>
    <section className="rounded-2xl bg-slate-950 p-6 text-white"><div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-wider text-blue-300">DEVELOPER SCENARIO</span><span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-slate-200">BEGINNER · 15–20 MIN</span></div><h2 className="mt-3 text-lg font-bold">A release candidate has four reported issues</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">You are a junior developer reviewing a small web application before release. The team has isolated four code snippets. Diagnose each issue, choose the most appropriate fix, and protect the code with a useful test.</p><div className="mt-5 grid gap-3 sm:grid-cols-3">{[['ISSUES','4 code reviews'],['SCORING','25 points each'],['FOCUS','Logic · Arrays · Async · Testing']].map(([a,b])=><div key={a} className="rounded-xl bg-white/10 p-3"><p className="text-[10px] text-slate-400">{a}</p><p className="mt-1 text-xs font-bold">{b}</p></div>)}</div></section>
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><h2 className="text-sm font-bold text-slate-900">Investigate the code</h2><p className="mt-1 text-xs text-slate-500">Choose one answer for each issue. Your score and explanations appear after submission.</p>
      {result ? <div className="mt-5 space-y-4"><div className="rounded-2xl bg-slate-950 p-6 text-white"><p className="text-xs font-bold uppercase tracking-wider text-blue-300">MISSION RESULT</p><div className="mt-2 flex items-end gap-2"><span className="text-4xl font-bold">{result.score}</span><span className="pb-1 text-sm text-slate-400">/ 100 points</span></div><p className="mt-2 text-sm text-slate-300">{result.score===100?'Excellent debugging. You identified each issue and selected appropriate fixes.':'Review each explanation and compare the recommended fixes with your choices.'}</p></div><div className="space-y-3">{result.criteria.map(item=>{const question=questions.find(q=>q.key===item.key);const selectedLabel=question?.options.find(option=>option[0]===item.selected)?.[1]||'No answer recorded';return <div key={item.key} className="rounded-xl border border-slate-200 p-4"><div className="flex items-center justify-between gap-2"><p className="text-xs font-bold text-slate-800">{item.label}</p><span className={`text-xs font-bold ${item.correct?'text-emerald-600':'text-rose-600'}`}>{item.correct?'+25 points':'0 points'}</span></div><div className="mt-3 grid gap-2 sm:grid-cols-2"><div className={`rounded-lg p-3 ${item.correct?'bg-emerald-50':'bg-rose-50'}`}><p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Your answer</p><p className="mt-1 text-xs font-semibold text-slate-800">{selectedLabel}</p></div><div className="rounded-lg bg-emerald-50 p-3"><p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Correct answer</p><p className="mt-1 text-xs font-semibold text-slate-800">{item.recommended}</p></div></div><p className="mt-3 text-xs leading-5 text-slate-500">{item.explanation}</p><p className="mt-2 text-xs font-semibold text-blue-700">Recommended fix</p><pre className="mt-2 overflow-x-auto rounded-lg bg-slate-950 p-3 text-[11px] leading-5 text-emerald-200"><code>{item.fix}</code></pre></div>})}</div><button onClick={restart} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"><RotateCcw size={14}/> Try again</button></div> : <div className="mt-5 space-y-4">{questions.map(q=><div key={q.key} className="rounded-xl border border-slate-200 p-4"><h3 className="text-xs font-bold text-slate-900">{q.title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{q.desc}</p><pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-3 text-[11px] leading-5 text-emerald-200"><code>{q.code}</code></pre><div className="mt-3 grid gap-2">{q.options.map(([value,label])=><label key={value} className={`flex cursor-pointer items-start gap-2 rounded-lg border p-3 text-xs leading-5 ${answers[q.key]===value?'border-blue-400 bg-blue-50':'border-slate-200 hover:border-slate-300'}`}><input type="radio" name={`bug-${q.key}`} checked={answers[q.key]===value} onChange={()=>setAnswers(current=>({...current,[q.key]:value}))} className="mt-0.5 accent-blue-600"/><span className="text-slate-700">{label}</span></label>)}</div></div>)}<button onClick={submit} disabled={questions.some(q=>!answers[q.key])} className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400">Submit debugging report <ArrowRight size={15}/></button><p className="text-center text-[10px] text-slate-400">Complete all four decisions before submitting.</p></div>}
    </section>
  </div>
}

function BusinessInsightsMission({ attempt, onSubmit, onBack }) {
  const [answers, setAnswers] = useState(attempt?.answers || {trend:'',segment:'',metric:'',recommendation:''})
  const [result, setResult] = useState(attempt || null)
  const questions = [
    {key:'trend',title:'1. Identify the revenue trend',desc:'Review the monthly revenue table. What is the clearest overall pattern?',options:[['growth','Revenue rises overall from January to June'],['decline','Revenue falls consistently each month'],['flat','Revenue remains almost unchanged']],correct:'growth',explanation:'Revenue increases from ₹4.8 lakh in January to ₹6.6 lakh in June. There is a small dip in April, but the overall direction is upward.'},
    {key:'segment',title:'2. Find the strongest customer segment',desc:'Which segment contributes the highest revenue in June?',options:[['new','New customers'],['returning','Returning customers'],['enterprise','Enterprise customers']],correct:'returning',explanation:'Returning customers contribute ₹2.8 lakh in June, more than New customers (₹2.1 lakh) and Enterprise customers (₹1.7 lakh).'},
    {key:'metric',title:'3. Choose a useful business KPI',desc:'The team wants to understand whether customers continue buying after their first purchase.',options:[['pageviews','Website page views'],['repeat','Repeat purchase rate'],['impressions','Advertisement impressions']],correct:'repeat',explanation:'Repeat purchase rate directly measures the share of customers who purchase again. Page views and impressions are activity measures, not retention outcomes.'},
    {key:'recommendation',title:'4. Recommend the next action',desc:'Returning customers are the largest revenue segment. What is the most defensible next step?',options:[['stop','Stop marketing to all other segments'],['investigate','Investigate what drives repeat purchases and test a retention campaign'],['assume','Assume the same pattern will continue without further analysis']],correct:'investigate',explanation:'A focused retention experiment is evidence-led and measurable. Keep monitoring other segments and compare campaign results against a baseline or control group.'},
  ]
  const submit = () => {
    const criteria = questions.map(q=>({key:q.key,label:q.title.replace(/^\d+\. /,''),selected:answers[q.key],correct:answers[q.key]===q.correct,points:25,explanation:q.explanation,recommended:q.options.find(o=>o[0]===q.correct)[1]}))
    const score=criteria.reduce((sum,item)=>sum+(item.correct?25:0),0)
    const submission={missionId:'DA-04',title:'Business Insights',score,total:100,completedAt:new Date().toISOString(),answers,criteria}
    setResult(submission); onSubmit(submission)
  }
  const restart=()=>{setAnswers({trend:'',segment:'',metric:'',recommendation:''});setResult(null)}
  return <div className="space-y-5">
    <div><button onClick={onBack} className="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-700"><ArrowLeft size={14}/> Back to missions</button><p className="text-xs font-bold uppercase tracking-wider text-blue-700">MISSION 04 · BUSINESS ANALYTICS</p><h1 className="mt-1 text-2xl font-bold text-slate-950">Business Insights</h1><p className="mt-2 text-sm text-slate-500">Explore sales performance, identify customer patterns and recommend a data-informed next step.</p></div>
    <section className="rounded-2xl bg-slate-950 p-6 text-white"><div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-wider text-blue-300">BUSINESS SCENARIO</span><span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-slate-200">BEGINNER · 15–20 MIN</span></div><h2 className="mt-3 text-lg font-bold">What is driving the store's growth?</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">A growing online retailer has shared six months of sales data. The business manager wants you to identify the revenue trend, understand which customer segment contributes most and recommend a sensible next action.</p><div className="mt-5 grid gap-3 sm:grid-cols-3">{[['DATASET','monthly_sales.csv'],['PERIOD','January–June'],['EXPECTED OUTPUT','Business insight brief']].map(([a,b])=><div key={a} className="rounded-xl bg-white/10 p-3"><p className="text-[10px] text-slate-400">{a}</p><p className="mt-1 text-xs font-bold">{b}</p></div>)}</div></section>
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><div className="flex items-center justify-between gap-3"><div><h2 className="text-sm font-bold text-slate-900">Sales dataset preview</h2><p className="mt-1 text-xs text-slate-500">Revenue shown in lakh rupees (₹ lakh).</p></div><span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-700">6 MONTHS</span></div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[560px] text-left text-xs"><thead><tr className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-400">{['Month','New customers','Returning customers','Enterprise','Total revenue'].map(h=><th key={h} className="px-3 py-3">{h}</th>)}</tr></thead><tbody>{[['Jan','1.8','1.9','1.1','4.8'],['Feb','1.9','2.0','1.2','5.1'],['Mar','2.0','2.2','1.2','5.4'],['Apr','1.8','2.3','1.4','5.5'],['May','2.0','2.6','1.5','6.1'],['Jun','2.1','2.8','1.7','6.6']].map(row=><tr key={row[0]} className="border-b border-slate-100 last:border-0">{row.map((cell,i)=><td key={i} className={`px-3 py-3 ${i===4?'font-bold text-slate-900':'text-slate-600'}`}>{i===0?cell:`₹${cell}L`}</td>)}</tr>)}</tbody></table></div><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="rounded-xl bg-slate-50 p-3"><p className="text-[10px] text-slate-400">JANUARY REVENUE</p><p className="mt-1 text-lg font-bold">₹4.8L</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-[10px] text-slate-400">JUNE REVENUE</p><p className="mt-1 text-lg font-bold">₹6.6L</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-[10px] text-slate-400">OVERALL CHANGE</p><p className="mt-1 text-lg font-bold text-emerald-600">+37.5%</p></div></div></section>
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><h2 className="text-sm font-bold text-slate-900">Build your business insight brief</h2><p className="mt-1 text-xs text-slate-500">Choose one answer for each decision. Your score and explanations appear after submission.</p>{result?<div className="mt-5 space-y-4"><div className="rounded-2xl bg-slate-950 p-6 text-white"><p className="text-xs font-bold uppercase tracking-wider text-blue-300">MISSION RESULT</p><div className="mt-2 flex items-end gap-2"><span className="text-4xl font-bold">{result.score}</span><span className="pb-1 text-sm text-slate-400">/ 100 points</span></div><p className="mt-2 text-sm text-slate-300">{result.score===100?'Excellent insight brief. You identified the trend, customer segment, KPI and a testable next action.':'Review the explanations below to strengthen your business-analysis decisions.'}</p></div><div className="space-y-3">{result.criteria.map(item=><div key={item.key} className="rounded-xl border border-slate-200 p-4"><div className="flex items-center justify-between gap-2"><p className="text-xs font-bold text-slate-800">{item.label}</p><span className={`text-xs font-bold ${item.correct?'text-emerald-600':'text-rose-600'}`}>{item.correct?'+25 points':'0 points'}</span></div><p className="mt-2 text-xs leading-5 text-slate-500">{item.explanation}</p>{!item.correct&&<p className="mt-2 text-xs font-semibold text-blue-700">Recommended: {item.recommended}</p>}</div>)}</div><button onClick={restart} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"><RotateCcw size={14}/> Try again</button></div>:<div className="mt-5 space-y-4">{questions.map(q=><div key={q.key} className="rounded-xl border border-slate-200 p-4"><h3 className="text-xs font-bold text-slate-900">{q.title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{q.desc}</p><div className="mt-3 grid gap-2">{q.options.map(([value,label])=><label key={value} className={`flex cursor-pointer items-start gap-2 rounded-lg border p-3 text-xs leading-5 ${answers[q.key]===value?'border-blue-400 bg-blue-50':'border-slate-200 hover:border-slate-300'}`}><input type="radio" name={`business-${q.key}`} checked={answers[q.key]===value} onChange={()=>setAnswers(current=>({...current,[q.key]:value}))} className="mt-0.5 accent-blue-600"/><span className="text-slate-700">{label}</span></label>)}</div></div>)}<button onClick={submit} disabled={questions.some(q=>!answers[q.key])} className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400">Submit business insight brief <ArrowRight size={15}/></button><p className="text-center text-[10px] text-slate-400">Complete all four decisions before submitting.</p></div>}</section>
  </div>
}

function MissionCenter({ attempt, advancedAttempt, evaluatorAttempt, businessAttempt, bugHunterAttempt, onSubmit, onAdvancedSubmit, onEvaluatorSubmit, onBusinessSubmit, onBugHunterSubmit }) {
  const [selectedMission, setSelectedMission] = useState('dataset')
  const [started, setStarted] = useState(Boolean(attempt))
  const [removeDuplicates, setRemoveDuplicates] = useState(attempt?.choices?.removeDuplicates ?? false)
  const [fillMissing, setFillMissing] = useState(attempt?.choices?.fillMissing ?? false)
  const [standardize, setStandardize] = useState(attempt?.choices?.standardize ?? false)
  const [invalidHandling, setInvalidHandling] = useState(attempt?.choices?.invalidHandling ?? '')
  const [result, setResult] = useState(attempt || null)
  if (selectedMission === 'model-builder') return <ModelBuilderMission attempt={advancedAttempt} onSubmit={onAdvancedSubmit} onBack={() => setSelectedMission('dataset')}/>
  if (selectedMission === 'model-evaluator') return <ModelEvaluatorMission attempt={evaluatorAttempt} onSubmit={onEvaluatorSubmit} onBack={() => setSelectedMission('dataset')}/>
  if (selectedMission === 'business-insights') return <BusinessInsightsMission attempt={businessAttempt} onSubmit={onBusinessSubmit} onBack={() => setSelectedMission('dataset')}/>
  if (selectedMission === 'bug-hunter') return <BugHunterMission attempt={bugHunterAttempt} onSubmit={onBugHunterSubmit} onBack={() => setSelectedMission('dataset')}/>

  const submit = () => {
    const criteria = [
      { key: 'removeDuplicates', label: 'Remove duplicate records', correct: removeDuplicates, points: 25, explanation: 'The repeated E-105 record should only appear once.' },
      { key: 'fillMissing', label: 'Handle missing salary values', correct: fillMissing, points: 25, explanation: 'The two missing salary values should be imputed using the median of valid salaries (₹55,000).' },
      { key: 'standardize', label: 'Standardize department labels', correct: standardize, points: 25, explanation: 'Department names should use consistent capitalization, such as Engineering and Marketing.' },
      { key: 'invalidHandling', label: 'Handle invalid experience value', correct: invalidHandling === 'set-missing', points: 25, explanation: 'The negative experience value is invalid; set it to missing and flag the row for review rather than treating it as valid.' },
    ]
    const score = criteria.reduce((total, item) => total + (item.correct ? item.points : 0), 0)
    const submission = {
      missionId: 'ML-01',
      title: 'Dataset Detective',
      score,
      total: 100,
      completedAt: new Date().toISOString(),
      choices: { removeDuplicates, fillMissing, standardize, invalidHandling },
      criteria: criteria.map(({ key, label, correct, points, explanation }) => ({ key, label, correct, points, explanation })),
    }
    setResult(submission)
    onSubmit(submission)
  }

  const restart = () => {
    setResult(null)
    setStarted(true)
    setRemoveDuplicates(false)
    setFillMissing(false)
    setStandardize(false)
    setInvalidHandling('')
  }

  if (!started) {
    return <div className="space-y-6">
      <section className="rounded-3xl bg-slate-950 p-7 text-white sm:p-9">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-blue-300"><span>ML ENGINEER TRACK</span><span className="text-slate-500">/</span><span>MISSION 01</span></div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Dataset Detective</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">A small business team has shared an employee dataset, but it contains quality issues. Inspect the records, decide how to clean them and submit your data-preparation plan.</p>
        <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-300"><span className="flex items-center gap-2"><Clock3 size={14}/> 15–20 minutes</span><span className="flex items-center gap-2"><Database size={14}/> 9 records</span><span className="flex items-center gap-2"><ClipboardCheck size={14}/> 4 evaluation criteria</span></div>
      </section>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700"><FileSpreadsheet size={19}/></div><h3 className="mt-4 text-sm font-bold">Inspect the data</h3><p className="mt-2 text-xs leading-5 text-slate-500">Review the employee records and identify missing, duplicate, inconsistent and invalid values.</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-700"><SlidersHorizontalIcon/></div><h3 className="mt-4 text-sm font-bold">Choose cleaning actions</h3><p className="mt-2 text-xs leading-5 text-slate-500">Select the data-cleaning steps you would apply before analysis.</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><Award size={19}/></div><h3 className="mt-4 text-sm font-bold">Get evaluated</h3><p className="mt-2 text-xs leading-5 text-slate-500">Receive a score against a transparent rubric with explanations for each decision.</p></div>
      </div>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-semibold text-blue-700">AVAILABLE MISSION</p><h2 className="mt-1 text-lg font-bold text-slate-950">01 · Dataset Detective</h2><p className="mt-1 text-xs text-slate-500">Data preparation · Beginner</p></div><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700">READY TO START</span></div>
        <button onClick={() => setStarted(true)} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">Start mission <Play size={15}/></button>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-xs font-bold text-slate-700">ADVANCED MISSIONS</p><div className="mt-3 grid gap-3 sm:grid-cols-2"><button onClick={()=>setSelectedMission("model-builder")} className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 text-left transition hover:border-blue-400"><span className="text-[10px] font-bold text-blue-700">MISSION 02 · AVAILABLE</span><p className="mt-1 text-sm font-semibold text-slate-900">ML Model Builder</p><p className="mt-1 text-xs text-slate-500">Design a customer-churn classification model.</p><span className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-blue-700">Start mission <ArrowRight size={13}/></span>{advancedAttempt&&<span className="mt-2 block text-[10px] font-semibold text-emerald-700">Latest score: {advancedAttempt.score}/100</span>}</button><button onClick={()=>setSelectedMission("model-evaluator")} className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 text-left transition hover:border-blue-400"><span className="text-[10px] font-bold text-blue-700">MISSION 03 · AVAILABLE</span><p className="mt-1 text-sm font-semibold text-slate-900">Model Evaluator</p><p className="mt-1 text-xs text-slate-500">Interpret model metrics and explain results.</p><span className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-blue-700">Start mission <ArrowRight size={13}/></span>{evaluatorAttempt&&<span className="mt-2 block text-[10px] font-semibold text-emerald-700">Latest score: {evaluatorAttempt.score}/100</span>}</button><button onClick={()=>setSelectedMission("business-insights")} className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 text-left transition hover:border-blue-400"><span className="text-[10px] font-bold text-blue-700">MISSION 04 · AVAILABLE</span><p className="mt-1 text-sm font-semibold text-slate-900">Business Insights</p><p className="mt-1 text-xs text-slate-500">Analyse sales trends and recommend a business action.</p><span className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-blue-700">Start mission <ArrowRight size={13}/></span>{businessAttempt&&<span className="mt-2 block text-[10px] font-semibold text-emerald-700">Latest score: {businessAttempt.score}/100</span>}</button><button onClick={()=>setSelectedMission("bug-hunter")} className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 text-left transition hover:border-blue-400"><span className="text-[10px] font-bold text-blue-700">MISSION 05 · AVAILABLE</span><p className="mt-1 text-sm font-semibold text-slate-900">Bug Hunter</p><p className="mt-1 text-xs text-slate-500">Debug code snippets and choose reliable fixes.</p><span className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-blue-700">Start mission <ArrowRight size={13}/></span>{bugHunterAttempt&&<span className="mt-2 block text-[10px] font-semibold text-emerald-700">Latest score: {bugHunterAttempt.score}/100</span>}</button></div></section>
    </div>
  }

  return <div className="space-y-6">
    <div className="flex flex-wrap items-start justify-between gap-3"><div><button onClick={() => setStarted(false)} className="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-700"><ArrowLeft size={14}/> Back to missions</button><p className="text-xs font-bold uppercase tracking-wider text-blue-700">MISSION 01 · DATA PREPARATION</p><h1 className="mt-1 text-2xl font-bold text-slate-950">Dataset Detective</h1><p className="mt-2 text-sm text-slate-500">Review the raw data, then choose the cleaning actions you would take.</p></div><div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500"><Clock3 className="mr-1 inline" size={13}/> Suggested time: 15–20 min</div></div>

    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3"><div><h2 className="text-sm font-bold text-slate-900">Scenario</h2><p className="mt-1 text-xs text-slate-500">You are a junior data analyst supporting the People Analytics team.</p></div><span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-700">BUSINESS TASK</span></div>
      <p className="mt-4 text-sm leading-6 text-slate-600">The HR team wants to analyse employee salary and performance trends. Before the analysis begins, you must prepare the dataset so that duplicate records, missing values, inconsistent categories and invalid values do not distort the results.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="rounded-xl bg-slate-50 p-3"><p className="text-[10px] text-slate-400">DATASET</p><p className="mt-1 text-xs font-bold text-slate-800">employee_records.csv</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-[10px] text-slate-400">RECORDS</p><p className="mt-1 text-xs font-bold text-slate-800">9 rows · 6 columns</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-[10px] text-slate-400">EXPECTED OUTPUT</p><p className="mt-1 text-xs font-bold text-slate-800">Cleaning plan</p></div></div>
    </section>

    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-sm font-bold text-slate-900">Raw dataset preview</h2><p className="mt-1 text-xs text-slate-400">The highlighted cells indicate possible data-quality issues.</p></div><div className="flex flex-wrap gap-2 text-[10px]"><span className="rounded-full bg-amber-50 px-2 py-1 font-semibold text-amber-700">Missing value</span><span className="rounded-full bg-rose-50 px-2 py-1 font-semibold text-rose-700">Duplicate / invalid</span></div></div>
      <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[700px] border-collapse text-left text-xs"><thead><tr className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-400">{['Employee ID','Name','Department','Experience (yrs)','Salary (₹)','Rating'].map(h=><th key={h} className="px-3 py-3 font-bold">{h}</th>)}</tr></thead><tbody>{missionRows.map((r,i)=><tr key={`${r.id}-${i}`} className="border-b border-slate-100 last:border-0"><td className="px-3 py-3 font-semibold text-slate-700">{r.id}{i===5&&<span className="ml-2 rounded bg-rose-50 px-1.5 py-0.5 text-[9px] font-bold text-rose-600">DUPLICATE</span>}</td><td className="px-3 py-3 text-slate-700">{r.name}</td><td className="px-3 py-3 text-slate-700">{r.department}</td><td className={`px-3 py-3 ${r.experience==='-1'?'bg-rose-50 font-bold text-rose-700':'text-slate-700'}`}>{r.experience}</td><td className={`px-3 py-3 ${r.salary==='—'?'bg-amber-50 font-bold text-amber-700':'text-slate-700'}`}>{r.salary}</td><td className="px-3 py-3 text-slate-700">{r.rating}</td></tr>)}</tbody></table></div>
      <div className="mt-4 flex flex-wrap gap-4 text-[10px] text-slate-500"><span>• 1 repeated record</span><span>• 2 missing salary values</span><span>• Inconsistent department capitalization</span><span>• 1 invalid negative experience value</span></div>
    </section>

    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-5"><h2 className="text-sm font-bold text-slate-900">Your data-cleaning plan</h2><p className="mt-1 text-xs text-slate-500">Select the action you would take for each issue. You can review your choices before submitting.</p></div>
      {result ? <div className="space-y-5">
        <div className="rounded-2xl bg-slate-950 p-6 text-white"><div className="text-xs font-semibold uppercase tracking-wider text-blue-300">MISSION RESULT</div><div className="mt-2 flex items-end gap-2"><span className="text-4xl font-bold">{result.score}</span><span className="pb-1 text-sm text-slate-400">/ 100 points</span></div><p className="mt-2 text-sm text-slate-300">{result.score===100?'Excellent work. Your cleaning plan addresses all four data-quality issues.':result.score>=75?'Strong attempt. Review the feedback below to improve your data-cleaning decisions.':result.score>=50?'Good start. Some important data-quality issues still need attention.':'Keep practising. Review each issue and the recommended cleaning approach.'}</p></div>
        <div className="space-y-3">{result.criteria.map(item=><div key={item.key} className="rounded-xl border border-slate-200 p-4"><div className="flex items-center justify-between gap-3"><span className="text-xs font-semibold text-slate-800">{item.label}</span><span className={`text-xs font-bold ${item.correct?'text-emerald-600':'text-rose-600'}`}>{item.correct?`+${item.points} points`:'0 points'}</span></div><p className="mt-2 text-xs leading-5 text-slate-500">{item.explanation}</p></div>)}</div>
        <div className="flex flex-wrap gap-3"><button onClick={restart} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"><RotateCcw size={14}/> Try again</button><span className="self-center text-[10px] text-slate-400">Your latest attempt is saved in this browser.</span></div>
      </div> : <div className="space-y-4">
        <ChoiceCard title="1. Duplicate record" description="Employee E-105 appears twice with identical details." checked={removeDuplicates} onChange={setRemoveDuplicates} option="Remove the duplicate row and keep one copy."/>
        <ChoiceCard title="2. Missing salary values" description="Two employee records have no salary value." checked={fillMissing} onChange={setFillMissing} option="Impute the missing salaries using the median of valid salary values (₹55,000)."/>
        <ChoiceCard title="3. Inconsistent department labels" description="Some department values use lowercase while others use title case." checked={standardize} onChange={setStandardize} option="Standardize department names to a consistent format (e.g. Engineering, Marketing)."/>
        <div className="rounded-xl border border-slate-200 p-4"><h3 className="text-xs font-bold text-slate-800">4. Invalid experience value</h3><p className="mt-1 text-xs leading-5 text-slate-500">One employee has -1 years of experience. How would you handle it?</p><select value={invalidHandling} onChange={e=>setInvalidHandling(e.target.value)} className="field mt-3"><option value="">Choose an action</option><option value="set-missing">Set it to missing and flag the record for review</option><option value="keep">Keep -1 as a valid experience value</option><option value="delete-row">Delete the entire employee record immediately</option></select></div>
        <div className="rounded-xl bg-blue-50 p-4"><div className="flex gap-2"><Lightbulb size={16} className="mt-0.5 shrink-0 text-blue-700"/><div><p className="text-xs font-bold text-blue-900">A useful data practice</p><p className="mt-1 text-xs leading-5 text-blue-800">Choose a cleaning method that preserves useful information and makes assumptions explicit. In a real project, document each transformation.</p></div></div></div>
        <button onClick={submit} disabled={!invalidHandling} className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400">Submit cleaning plan <ArrowRight size={15}/></button>
        <p className="text-center text-[10px] text-slate-400">Your score and feedback will appear only after submission.</p>
      </div>}
    </section>
  </div>
}

function ChoiceCard({ title, description, checked, onChange, option }) {
  return <label className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition ${checked?'border-blue-400 bg-blue-50/60':'border-slate-200 hover:border-slate-300'}`}><input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)} className="mt-0.5 h-4 w-4 accent-blue-600"/><span className="min-w-0"><span className="block text-xs font-bold text-slate-800">{title}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{description}</span><span className="mt-2 block text-xs font-medium text-slate-700">{option}</span></span></label>
}

function SlidersHorizontalIcon() { return <span className="text-lg font-bold">☷</span> }


function SkillGrowthChart({ history }) {
  const topics = [...new Set(history.flatMap(a => a.topics.map(t => t.topic)))]
  const colors = ['#2563eb','#7c3aed','#059669','#ea580c','#db2777','#0891b2']
  // Give every attempt enough horizontal room so the last label and point never get clipped.
  const width = Math.max(760, history.length * 150 + 100), height = 290, left = 48, right = 54, top = 20, bottom = 48
  const x = i => left + (history.length <= 1 ? (width-left-right)/2 : i*(width-left-right)/(history.length-1))
  const y = value => top + (100-value)*(height-top-bottom)/100
  const previous = history.length > 1 ? history[history.length - 2] : null
  const latest = history[history.length - 1]
  const insights = topics.map((topic, i) => {
    const now = latest.topics.find(t => t.topic === topic)
    const before = previous?.topics.find(t => t.topic === topic)
    const currentScore = now ? (typeof now.score === 'number' ? now.score : (now.correct ? 100 : 0)) : null
    const previousScore = before ? (typeof before.score === 'number' ? before.score : (before.correct ? 100 : 0)) : null
    const delta = currentScore !== null && previousScore !== null ? currentScore - previousScore : null
    return { topic, color: colors[i % colors.length], currentScore, delta }
  })
  return <>
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-sm font-bold text-slate-900">Skill growth over time</h2><p className="mt-1 text-xs text-slate-500">Compare skill-level quiz accuracy across your assessment attempts.</p></div><span className="rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-700">{history.length} {history.length===1?'ATTEMPT':'ATTEMPTS'}</span></div>
      <div className="mt-4 overflow-x-auto pb-2"><svg viewBox={`0 0 ${width} ${height}`} style={{minWidth: `${Math.min(width,760)}px`, width: `${width}px`, maxWidth: '100%'}} className="h-auto" role="img" aria-label="Skill growth line chart">
        {[0,25,50,75,100].map(v=><g key={v}><line x1={left} x2={width-right} y1={y(v)} y2={y(v)} stroke="#e2e8f0" strokeDasharray="4 4"/><text x={left-10} y={y(v)+4} textAnchor="end" fontSize="10" fill="#94a3b8">{v}%</text></g>)}
        {history.map((a,i)=><text key={i} x={x(i)} y={height-12} textAnchor="middle" fontSize="10" fill="#64748b">Attempt {i+1}</text>)}
        {topics.map((topic,ti)=>{const pts=history.map((a,i)=>{const found=a.topics.find(t=>t.topic===topic);return found?`${x(i)},${y(typeof found.score === 'number' ? found.score : (found.correct?100:0))}`:null}).filter(Boolean);return <g key={topic}>{pts.length>1&&<polyline points={pts.join(' ')} fill="none" stroke={colors[ti%colors.length]} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>}{history.map((a,i)=>{const found=a.topics.find(t=>t.topic===topic);return found?<circle key={i} cx={x(i)} cy={y(typeof found.score === 'number' ? found.score : (found.correct?100:0))} r="5" fill={colors[ti%colors.length]} stroke="white" strokeWidth="2"><title>{`${topic} · Attempt ${i+1}: ${typeof found.score === 'number' ? found.score : (found.correct?100:0)}%`}</title></circle>:null})}</g>})}
      </svg></div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">{topics.map((topic,i)=><span key={topic} className="inline-flex items-center gap-2 text-[10px] text-slate-600"><span className="h-2 w-2 rounded-full" style={{background:colors[i%colors.length]}}/>{topic}</span>)}</div>
      <p className="mt-4 text-[10px] leading-5 text-slate-400">Each point is the percentage correct across five questions for that skill in that attempt. Scores are more granular, but remain an early indicator—not a measure of professional proficiency.</p>
    </section>
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div><h2 className="text-sm font-bold text-slate-900">Skill signals</h2><p className="mt-1 text-xs text-slate-500">A comparison with your previous attempt—not a measure of professional proficiency.</p></div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">{insights.map(item=>{
        const status = item.delta === null ? 'Starting point' : item.delta > 0 ? 'Improved' : item.delta < 0 ? 'Needs attention' : 'No change'
        const tone = item.delta === null ? 'text-slate-500 bg-slate-50' : item.delta > 0 ? 'text-emerald-700 bg-emerald-50' : item.delta < 0 ? 'text-amber-700 bg-amber-50' : 'text-slate-600 bg-slate-50'
        const detail = item.delta === null ? 'Complete another assessment to compare this skill.' : item.delta > 0 ? `Improved by ${item.delta} percentage points since your previous attempt.` : item.delta < 0 ? `Dropped by ${Math.abs(item.delta)} percentage points since your previous attempt.` : item.currentScore === 100 ? 'You answered all questions correctly in both recent attempts. Keep practising.' : `Your score stayed at ${item.currentScore}%. Use a focused practice mission to improve.`
        return <div key={item.topic} className="rounded-xl border border-slate-100 p-4"><div className="flex items-center justify-between gap-2"><span className="text-xs font-semibold text-slate-800">{item.topic}</span><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${tone}`}>{status}</span></div><p className="mt-2 text-[11px] leading-5 text-slate-500">{detail}</p></div>
      })}</div>
      {history.length < 2 && <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">Complete another assessment to see which skills are improving or need attention.</p>}
    </section>
  </>
}

function AssessmentRetake({ career, onComplete, onCancel }) {
  const questions = questionsByCareer[career]
  const [answers,setAnswers] = useState({})
  const finish = () => {
    const score=questions.reduce((n,q)=>n+(answers[q.id]===q.answer?1:0),0)
    onComplete({score,total:questions.length,percentage:Math.round(score/questions.length*100),topics:summarizeTopics(questions,answers),completedAt:new Date().toISOString()})
  }
  return <section className="rounded-2xl border border-blue-200 bg-white p-5 sm:p-6"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-wider text-blue-700">NEW ASSESSMENT ATTEMPT</p><h2 className="mt-1 text-lg font-bold">Check your progress</h2><p className="mt-1 text-xs text-slate-500">Answer all 25 questions. Your previous attempts will remain in your history.</p></div><button onClick={onCancel} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500">Cancel</button></div>
    <div className="mt-5 max-h-[420px] space-y-4 overflow-y-auto pr-1">{questions.map((q,i)=><div key={q.id} className="rounded-xl border border-slate-100 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Question {i+1} · {q.topic}</p><p className="mt-2 text-sm font-semibold leading-6">{q.prompt}</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{q.options.map((o,j)=><button key={o} onClick={()=>setAnswers(a=>({...a,[q.id]:j}))} className={`rounded-lg border px-3 py-2 text-left text-xs ${answers[q.id]===j?'border-blue-500 bg-blue-50 text-blue-800':'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{String.fromCharCode(65+j)}. {o}</button>)}</div></div>)}</div>
    <div className="mt-4 flex items-center justify-between text-xs text-slate-500"><span>{Object.keys(answers).length}/{questions.length} answered</span><button disabled={Object.keys(answers).length!==questions.length} onClick={finish} className="rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white disabled:bg-slate-200 disabled:text-slate-400">Submit attempt</button></div>
  </section>
}


const learningGuidance = {
  python: {
    focus: 'Strengthen core Python fundamentals before moving into larger projects.',
    actions: ['Practise variables, collections, loops and functions.', 'Solve 5 short coding problems without looking at solutions.', 'Build a small script that reads and summarizes a CSV file.'],
    resource: 'Python basics: data types, dictionaries, functions and file handling.'
  },
  'data handling': {
    focus: 'Build confidence in preparing reliable datasets before analysis or model training.',
    actions: ['Practise identifying duplicates and missing values.', 'Compare mean and median imputation on a small dataset.', 'Standardize categories and flag invalid records.'],
    resource: 'Dataset cleaning, missing-value strategies and data validation.'
  },
  'data cleaning': {
    focus: 'Improve the quality checks you perform before drawing conclusions from data.',
    actions: ['Profile missing and duplicate values.', 'Standardize inconsistent formats and categories.', 'Document every cleaning decision and its reason.'],
    resource: 'Data quality checks, cleaning workflows and validation.'
  },
  statistics: {
    focus: 'Revisit the statistical concepts used to interpret data correctly.',
    actions: ['Calculate mean, median and standard deviation.', 'Practise interpreting distributions and outliers.', 'Explain why correlation does not prove causation.'],
    resource: 'Descriptive statistics, distributions, variability and correlation.'
  },
  'machine learning': {
    focus: 'Reinforce the foundations of common machine-learning tasks.',
    actions: ['Distinguish classification, regression and clustering.', 'Identify features, targets and data splits.', 'Explain why a test set is needed.'],
    resource: 'ML fundamentals: supervised learning, unsupervised learning and train/test splits.'
  },
  'model evaluation': {
    focus: 'Practise choosing and interpreting metrics rather than relying on accuracy alone.',
    actions: ['Read a confusion matrix.', 'Compare precision and recall for a use case.', 'Explain what a test score says about unseen data.'],
    resource: 'Confusion matrices, accuracy, precision, recall and cross-validation.'
  },
  'model behaviour': {
    focus: 'Understand how model quality can change across data, groups and deployment.',
    actions: ['Compare overfitting and underfitting examples.', 'Identify a data-leakage scenario.', 'Describe how to monitor drift and fairness after deployment.'],
    resource: 'Overfitting, data leakage, fairness and concept drift.'
  },
  sql: {
    focus: 'Build fluency in querying and combining structured data.',
    actions: ['Practise SELECT, WHERE and ORDER BY.', 'Write GROUP BY queries with aggregate functions.', 'Join two related tables and check the result.'],
    resource: 'SQL filtering, aggregation and joins.'
  },
  visualization: {
    focus: 'Choose clear charts and communicate what the data actually shows.',
    actions: ['Choose chart types for categories and distributions.', 'Label axes and units clearly.', 'Spot misleading scales and missing context.'],
    resource: 'Chart selection, visual design and communicating insights.'
  },
  analysis: {
    focus: 'Turn observations into evidence-backed recommendations.',
    actions: ['Validate a surprising trend before explaining it.', 'Segment a metric into meaningful groups.', 'Write a recommendation with evidence and limitations.'],
    resource: 'Analytical thinking, KPIs, segmentation and recommendations.'
  },
  programming: {
    focus: 'Strengthen the building blocks used to write reliable programs.',
    actions: ['Practise variables, conditions and loops.', 'Write reusable functions with clear inputs and outputs.', 'Build a small command-line program.'],
    resource: 'Programming fundamentals and problem solving.'
  },
  'data structures': {
    focus: 'Understand how to choose a data structure for a particular problem.',
    actions: ['Implement a stack and queue.', 'Practise array and linked-list operations.', 'Compare time and space trade-offs for common operations.'],
    resource: 'Arrays, linked lists, stacks, queues and complexity.'
  },
  debugging: {
    focus: 'Develop a repeatable process for finding and fixing defects.',
    actions: ['Reproduce a bug with a minimal example.', 'Use breakpoints or print statements to inspect state.', 'Write a test that prevents the bug from returning.'],
    resource: 'Debugging workflow, testing and error interpretation.'
  },
  'software design': {
    focus: 'Practise structuring code so it is easier to change and maintain.',
    actions: ['Break a feature into small components.', 'Separate responsibilities between functions or modules.', 'Sketch a simple design before implementation.'],
    resource: 'Modularity, interfaces, cohesion and maintainable design.'
  }
}

function roadmapFor(topics, career, missionAttempt) {
  const entries = (topics || []).map((topic, index) => {
    const score = typeof topic.score === 'number' ? topic.score : (topic.correct ? 100 : 0)
    const key = topic.topic.toLowerCase()
    const guidance = learningGuidance[key] || {
      focus: `Build stronger foundations in ${topic.topic}.`,
      actions: [`Review the core concepts in ${topic.topic}.`, `Complete a short practice exercise in ${topic.topic}.`, `Apply ${topic.topic} in a small practical task.`],
      resource: `${topic.topic}: fundamentals, examples and guided practice.`
    }
    const priority = score < 40 ? 'High priority' : score < 80 ? 'Build next' : 'Maintain'
    return { ...topic, score, priority, guidance, index }
  }).sort((a, b) => a.score - b.score || a.index - b.index)

  const practicalEvidence = missionAttempt
    ? `You scored ${missionAttempt.score}/100 in Dataset Detective. This is practical evidence from a separate simulation, so it is shown alongside—not merged into—your quiz scores.`
    : 'Complete Dataset Detective to add practical evidence alongside your knowledge assessment.'
  return { entries, practicalEvidence, career }
}


const practiceBank = {"Python": ["Which Python type is best for storing key–value pairs?", ["list", "tuple", "dictionary", "set"], 2, "A dictionary stores values under unique keys."], "Data handling": ["A numeric column has extreme outliers and some missing values. Which simple imputation is often more robust than the mean?", ["Median", "Maximum", "Sum", "Row number"], 0, "The median is less affected by extreme values."], "Machine learning": ["Which machine-learning task predicts a category such as spam or not spam?", ["Regression", "Classification", "Clustering", "Dimensionality reduction"], 1, "Classification predicts discrete class labels."], "Model evaluation": ["If missing a positive case is costly, which metric should you pay close attention to?", ["Recall", "Training time", "File size", "R-squared only"], 0, "Recall measures how many actual positive cases were found."], "Model behaviour": ["A model performs very well on training data but poorly on new data. What is a likely issue?", ["Overfitting", "Perfect generalization", "Data sorting", "Underfitting always"], 0, "Overfitting means the model has learned training-specific patterns that do not generalize."], "Statistics": ["Which measure is generally less affected by extreme outliers?", ["Mean", "Median", "Range", "Sum"], 1, "The median is based on the middle ordered value."], "SQL": ["Which SQL clause filters rows before aggregation?", ["HAVING", "WHERE", "ORDER BY", "LIMIT"], 1, "WHERE filters rows before GROUP BY aggregation."], "Data cleaning": ["What should you do first when you find missing values in a dataset?", ["Delete every row", "Inspect their amount and pattern", "Replace all with zero", "Ignore them"], 1, "Inspecting missingness helps choose a defensible treatment."], "Visualization": ["Which chart is a good default for comparing values across categories?", ["Bar chart", "Histogram", "Network graph", "Gantt chart"], 0, "Bar charts make category comparisons easy to read."], "Analysis": ["A KPI suddenly changes. What should an analyst do first?", ["Claim success immediately", "Check metric definitions, data and context", "Delete old values", "Ignore it"], 1, "Validate the measurement and context before explaining a change."], "Programming": ["Which construct repeats a block of code?", ["Loop", "Comment", "Import", "Variable"], 0, "Loops repeat instructions while a condition or sequence requires it."], "Data structures": ["Which data structure follows first-in, first-out order?", ["Stack", "Queue", "Tree", "Set"], 1, "A queue processes the earliest inserted item first."], "Debugging": ["What is a good first step when investigating a bug?", ["Rewrite the whole app", "Reproduce the issue reliably", "Delete the tests", "Ignore the error"], 1, "A reproducible case makes it easier to isolate the cause."], "Software design": ["What does modular design aim to achieve?", ["Put all code in one function", "Separate a system into focused components", "Avoid naming variables", "Remove testing"], 1, "Focused modules are easier to understand, test and change."]}

function LearningActivity({ item, completed, onComplete }) {
  const [opened, setOpened] = useState(false)
  const [choice, setChoice] = useState(null)
  const [feedback, setFeedback] = useState('')
  const challenge = practiceBank[item.topic] || [`Which is the best next step when learning ${item.topic}?`, ['Apply the idea in a small exercise','Skip all practice','Memorize without understanding','Avoid feedback'], 0, 'Short, focused practice helps turn a concept into a usable skill.']
  const submit = () => {
    if (choice === null) { setFeedback('Choose an answer first.'); return }
    if (choice === challenge[2]) { setFeedback(`Correct. ${challenge[3]}`); onComplete(item.topic) }
    else setFeedback('Not quite. Review the study focus and try again.')
  }
  return <article className="mt-4 rounded-xl border border-blue-100 bg-blue-50/40 p-4">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div><p className="text-[10px] font-bold uppercase tracking-wider text-blue-700">INTERACTIVE PRACTICE</p><p className="mt-1 text-xs text-slate-600">Read the study focus, then answer a short knowledge check.</p></div>
      {completed ? <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-[10px] font-bold text-emerald-700">COMPLETED</span> : <button onClick={()=>setOpened(v=>!v)} className="rounded-lg bg-slate-950 px-3 py-2 text-[10px] font-semibold text-white">{opened?'Close practice':'Start practice'}</button>}
    </div>
    {opened && !completed && <div className="mt-4 rounded-lg bg-white p-4">
      <p className="text-xs font-semibold text-slate-800">{challenge[0]}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">{challenge[1].map((option,index)=><button key={option} onClick={()=>{setChoice(index);setFeedback('')}} className={`rounded-lg border px-3 py-2.5 text-left text-xs ${choice===index?'border-blue-500 bg-blue-50 text-blue-800':'border-slate-200 bg-white text-slate-600 hover:border-blue-300'}`}>{String.fromCharCode(65+index)}. {option}</button>)}</div>
      <div className="mt-3 flex flex-wrap items-center gap-3"><button onClick={submit} className="rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white">Check answer</button>{feedback && <p className={`text-xs ${choice===challenge[2]?'text-emerald-700':'text-slate-500'}`}>{feedback}</p>}</div>
    </div>}
    {completed && <p className="mt-3 text-xs text-emerald-700">You completed this practice check. Revisit the topic and reassess when you're ready.</p>}
  </article>
}

function App() {
 const [saved,setSaved]=useState(readSaved)
 const [active,setActive]=useState('Overview')
 const [showRetake,setShowRetake]=useState(false)
 const complete=value=>{const first={...value,assessmentHistory:[{...value.assessment,attempt:1}]};save(first);setSaved(first)}
 const reset=()=>{if(confirm('Reset this demo profile and return to onboarding?')){localStorage.removeItem(KEY);setSaved(null)}}
 const saveMissionAttempt=attempt=>{const history=[...(saved.missionHistory|| (saved.missionAttempt?[saved.missionAttempt]:[])),attempt];const updated={...saved,missionAttempt:attempt,missionHistory:history};save(updated);setSaved(updated)}
 const saveAdvancedMissionAttempt=attempt=>{const history=[...(saved.advancedMissionHistory|| (saved.advancedMissionAttempt?[saved.advancedMissionAttempt]:[])),attempt];const updated={...saved,advancedMissionAttempt:attempt,advancedMissionHistory:history};save(updated);setSaved(updated)}
 const saveEvaluatorMissionAttempt=attempt=>{const history=[...(saved.evaluatorMissionHistory|| (saved.evaluatorMissionAttempt?[saved.evaluatorMissionAttempt]:[])),attempt];const updated={...saved,evaluatorMissionAttempt:attempt,evaluatorMissionHistory:history};save(updated);setSaved(updated)}
 const saveBusinessMissionAttempt=attempt=>{const history=[...(saved.businessMissionHistory|| (saved.businessMissionAttempt?[saved.businessMissionAttempt]:[])),attempt];const updated={...saved,businessMissionAttempt:attempt,businessMissionHistory:history};save(updated);setSaved(updated)}
 const saveBugHunterMissionAttempt=attempt=>{const history=[...(saved.bugHunterMissionHistory|| (saved.bugHunterMissionAttempt?[saved.bugHunterMissionAttempt]:[])),attempt];const updated={...saved,bugHunterMissionAttempt:attempt,bugHunterMissionHistory:history};save(updated);setSaved(updated)}
 const completeLearningActivity=topic=>{const learningProgress={...(saved.learningProgress||{}),[topic]:true};const updated={...saved,learningProgress};save(updated);setSaved(updated)}
 if(!saved) return <Onboarding onComplete={complete}/>
 const career=careerTracks.find(c=>c.id===saved.career)
 const assessmentHistory=saved.assessmentHistory?.length?saved.assessmentHistory:[saved.assessment]
 const saveAssessmentAttempt=assessment=>{const history=[...assessmentHistory,{...assessment,attempt:assessmentHistory.length+1}];const updated={...saved,assessment,assessmentHistory:history};save(updated);setSaved(updated);setShowRetake(false)}
 const initials=saved.profile.name.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase()
 const missionCatalog=[
  {key:'mission',title:'Dataset Detective',category:'Data preparation'},
  {key:'advancedMission',title:'ML Model Builder',category:'Model development'},
  {key:'evaluatorMission',title:'Model Evaluator',category:'Model evaluation'},
  {key:'businessMission',title:'Business Insights',category:'Business analytics'},
  {key:'bugHunterMission',title:'Bug Hunter',category:'Software development'},
 ]
 const unifiedMissionHistory=missionCatalog.flatMap((mission,index)=>{
  const history=saved[`${mission.key}History`]
  const latest=saved[`${mission.key}Attempt`]
  const attempts=Array.isArray(history)&&history.length?history:(latest?[latest]:[])
  return attempts.map((attempt,i)=>({...attempt,missionTitle:mission.title,category:mission.category,missionNumber:index+1,attemptNumber:i+1}))
 }).sort((a,b)=>new Date(b.completedAt||0)-new Date(a.completedAt||0))
 const completedMissionCount=missionCatalog.filter(m=>Boolean(saved[`${m.key}Attempt`])).length
 const overallMissionAverage=unifiedMissionHistory.length?Math.round(unifiedMissionHistory.reduce((sum,item)=>sum+(Number(item.score)||0),0)/unifiedMissionHistory.length):0
 const renderWorkspace=()=>{
   if(active==='Mission Center') return <MissionCenter attempt={saved.missionAttempt||null} advancedAttempt={saved.advancedMissionAttempt||null} evaluatorAttempt={saved.evaluatorMissionAttempt||null} businessAttempt={saved.businessMissionAttempt||null} bugHunterAttempt={saved.bugHunterMissionAttempt||null} onSubmit={saveMissionAttempt} onAdvancedSubmit={saveAdvancedMissionAttempt} onEvaluatorSubmit={saveEvaluatorMissionAttempt} onBusinessSubmit={saveBusinessMissionAttempt} onBugHunterSubmit={saveBugHunterMissionAttempt}/>
   if(active==='Skill Intelligence') return <div className="space-y-5"><section className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><h1 className="text-lg font-bold">Skill Intelligence</h1><p className="mt-1 text-xs text-slate-400">Your assessment history and skill growth over time.</p></div><button onClick={()=>setShowRetake(v=>!v)} className="rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700">{showRetake?'Close assessment':'Take new assessment'}</button></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Latest baseline assessment</p><p className="mt-2 text-2xl font-bold">{saved.assessment.percentage}%</p><p className="mt-1 text-[10px] text-slate-400">{saved.assessment.score}/{saved.assessment.total} correct · {assessmentHistory.length} attempts recorded</p></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Dataset Detective</p><p className="mt-2 text-2xl font-bold">{saved.missionAttempt?`${saved.missionAttempt.score}/100`:'Not attempted'}</p><p className="mt-1 text-[10px] text-slate-400">Practical data preparation task</p></div></div></section>{showRetake&&<AssessmentRetake career={saved.career} onComplete={saveAssessmentAttempt} onCancel={()=>setShowRetake(false)}/>}<SkillGrowthChart history={assessmentHistory}/><section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-sm font-bold">Latest skill snapshot</h2><div className="mt-4 space-y-3">{saved.assessment.topics.map(t=>{const score=typeof t.score==='number'?t.score:(t.correct?100:0);return <div key={t.topic} className="flex items-center justify-between rounded-xl border border-slate-100 p-4 text-xs"><span className="font-medium">{t.topic}</span><span className={score>=80?'font-semibold text-emerald-600':'font-semibold text-amber-600'}>{score}% · {score>=80?'Strong':'Practice recommended'}</span></div>})}</div><p className="mt-5 text-[10px] text-slate-400">A short quiz and one simulation are early indicators, not a complete measure of professional proficiency.</p></section></div>
   if(active==='Learning Roadmap') {
     const roadmap = roadmapFor(saved.assessment.topics, career, saved.missionAttempt)
     const highPriority = roadmap.entries.filter(item => item.score < 40)
     return <div className="space-y-5">
       <section className="rounded-2xl border border-slate-200 bg-white p-6">
         <div className="flex flex-wrap items-start justify-between gap-3">
           <div><p className="text-[10px] font-bold uppercase tracking-wider text-blue-700">PERSONALIZED LEARNING PLAN</p><h1 className="mt-1 text-lg font-bold">Your {career.title} roadmap</h1><p className="mt-1 text-xs text-slate-500">Prioritized using your latest 25-question skill assessment.</p></div>
           <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-700">{roadmap.entries.length} SKILL AREAS</span>
         </div>
         <div className="mt-5 rounded-xl bg-slate-50 p-4">
           <p className="text-xs font-bold text-slate-800">Where to focus first</p>
           <p className="mt-1 text-xs leading-5 text-slate-600">{highPriority.length ? `Start with ${highPriority.slice(0,2).map(item=>item.topic).join(' and ')}. These are currently your lowest-scoring areas.` : 'Your latest scores show no skill below 40%. Focus on strengthening the areas marked “Build next” and maintaining your strongest skills.'}</p>
         </div>
         <div className="mt-4 rounded-xl border border-slate-100 p-4">
           <div className="flex items-center gap-2"><Database size={16} className="text-emerald-600"/><p className="text-xs font-bold">Practical evidence</p></div>
           <p className="mt-2 text-xs leading-5 text-slate-500">{roadmap.practicalEvidence}</p>
         </div>
       </section>
       <section className="rounded-2xl border border-slate-200 bg-white p-6">
         <h2 className="text-sm font-bold">Recommended learning sequence</h2>
         <p className="mt-1 text-xs text-slate-400">Lowest-scoring skills appear first. Complete the suggested actions, then reassess to update this plan.</p>
         <div className="mt-5 space-y-4">
           {roadmap.entries.map((item, i) => <article key={item.topic} className="rounded-xl border border-slate-100 p-4 sm:p-5">
             <div className="flex flex-wrap items-start justify-between gap-3">
               <div className="flex min-w-0 items-center gap-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">{i+1}</div><div><h3 className="text-sm font-bold text-slate-900">{item.topic}</h3><p className="mt-1 text-[10px] text-slate-500">{item.guidance.focus}</p></div></div>
               <div className="text-right"><p className="text-sm font-bold text-slate-900">{item.score}%</p><span className={`mt-1 inline-block rounded-full px-2.5 py-1 text-[9px] font-bold ${item.score < 40 ? 'bg-rose-50 text-rose-700' : item.score < 80 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>{item.priority}</span></div>
             </div>
             <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${item.score < 40 ? 'bg-rose-500' : item.score < 80 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{width:`${item.score}%`}}/></div>
             <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
               <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Suggested actions</p><ul className="mt-2 space-y-1.5">{item.guidance.actions.map(action=><li key={action} className="flex gap-2 text-xs leading-5 text-slate-600"><CheckCircle2 size={13} className="mt-0.5 shrink-0 text-blue-600"/>{action}</li>)}</ul></div>
               <div className="rounded-lg bg-slate-50 p-3 sm:max-w-[210px]"><p className="text-[10px] font-bold text-slate-600">Study focus</p><p className="mt-1 text-xs leading-5 text-slate-500">{item.guidance.resource}</p></div>
             </div>
             <LearningActivity item={item} completed={Boolean(saved.learningProgress?.[item.topic])} onComplete={completeLearningActivity}/>
           </article>)}
         </div>
         <p className="mt-5 text-[10px] leading-5 text-slate-400">This prototype uses transparent score-based rules, not an AI model. Recommendations update when you submit a new assessment. Quiz scores are early indicators, not proof of professional proficiency.</p>
       </section>
     </div>
   }
   if(active==='AI Mentor') return (
  <AIMentor
    learnerContext={{
      name: saved.profile.name,
      education: saved.profile.education,
      interests: saved.profile.interests,
      careerTrack: career.title,
      baselineAssessment: saved.assessment,
      missionHistory: unifiedMissionHistory
    }}
  />
)
   if(active==='AI Roadmap') return (
  <AIRoadmap
    learnerContext={{
      name: saved.profile.name,
      education: saved.profile.education,
      interests: saved.profile.interests,
      careerTrack: career.title,
      baselineAssessment: saved.assessment,
      assessmentHistory: assessmentHistory,
      missionHistory: unifiedMissionHistory
    }}
  />
)
   if(active==='Performance') return <div className="space-y-5">
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
     <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700">MISSION PERFORMANCE</p><h1 className="mt-1 text-lg font-bold">Unified mission history</h1><p className="mt-1 text-xs text-slate-400">All your practical simulation attempts, collected in one place.</p>
     <div className="mt-5 grid gap-3 sm:grid-cols-3">
      <div className="rounded-xl bg-slate-50 p-4"><p className="text-[10px] text-slate-500">MISSIONS ATTEMPTED</p><p className="mt-2 text-2xl font-bold text-slate-950">{completedMissionCount}<span className="text-sm font-medium text-slate-400"> / 5</span></p></div>
      <div className="rounded-xl bg-slate-50 p-4"><p className="text-[10px] text-slate-500">TOTAL ATTEMPTS</p><p className="mt-2 text-2xl font-bold text-slate-950">{unifiedMissionHistory.length}</p></div>
      <div className="rounded-xl bg-slate-50 p-4"><p className="text-[10px] text-slate-500">AVERAGE ATTEMPT SCORE</p><p className="mt-2 text-2xl font-bold text-slate-950">{overallMissionAverage}<span className="text-sm font-medium text-slate-400"> / 100</span></p></div>
     </div>
    </section>
    <section className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex flex-wrap items-center justify-between gap-2"><div><h2 className="text-sm font-bold">Mission-wise progress</h2><p className="mt-1 text-xs text-slate-400">Latest recorded score for each mission.</p></div><span className="rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-700">{completedMissionCount} COMPLETED</span></div>
     <div className="mt-4 space-y-3">{missionCatalog.map((mission,index)=>{const latest=saved[`${mission.key}Attempt`];return <div key={mission.key} className="rounded-xl border border-slate-100 p-4"><div className="flex flex-wrap items-center justify-between gap-2"><div><p className="text-xs font-bold text-slate-900">{String(index+1).padStart(2,'0')} · {mission.title}</p><p className="mt-1 text-[10px] text-slate-400">{mission.category}</p></div><span className={`text-sm font-bold ${latest?'text-blue-700':'text-slate-300'}`}>{latest?`${latest.score}/100`:'Not attempted'}</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600" style={{width:`${latest?Math.max(0,Math.min(100,Number(latest.score)||0)):0}%`}}/></div><p className="mt-2 text-[10px] text-slate-400">{(saved[`${mission.key}History`]|| (latest?[latest]:[])).length} attempt(s) recorded</p></div>})}</div>
    </section>
    <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-sm font-bold">All attempts</h2><p className="mt-1 text-xs text-slate-400">Most recent attempts appear first. Scores are recorded separately for each mission.</p>
     {unifiedMissionHistory.length?<div className="mt-4 space-y-2">{unifiedMissionHistory.map((item,index)=><article key={`${item.missionId||item.missionTitle}-${item.completedAt||index}-${index}`} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-4"><div><p className="text-xs font-bold text-slate-900">{item.missionTitle}</p><p className="mt-1 text-[10px] text-slate-500">Mission {String(item.missionNumber).padStart(2,'0')} · Attempt {item.attemptNumber}{item.completedAt?` · ${new Date(item.completedAt).toLocaleString()}`:''}</p></div><span className="text-sm font-bold text-blue-700">{Number(item.score)||0}/100</span></article>)}</div>:<div className="mt-4 rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">Complete a mission to start building your history.</div>}
    </section>
    <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-sm font-bold">Baseline assessment</h2><p className="mt-1 text-xs text-slate-400">Your initial career knowledge check is tracked separately from practical mission scores.</p><div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 p-4"><div><p className="text-xs font-bold">{assessmentHistory.length} assessment attempt(s)</p><p className="mt-1 text-[10px] text-slate-400">Latest baseline knowledge check</p></div><span className="text-sm font-bold text-blue-700">{saved.assessment.percentage}%</span></div>
    </section>
   </div>
   return <><section className="rounded-3xl bg-slate-950 p-7 text-white"><p className="text-xs font-semibold uppercase tracking-wider text-blue-300">Your career workspace</p><h1 className="mt-3 text-3xl font-semibold">Welcome, {saved.profile.name.split(' ')[0]}.</h1><p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">Your {career.title} journey starts here. Practise realistic tasks, understand your skill gaps and build a focused learning plan.</p><button onClick={()=>setActive('Mission Center')} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-950">Explore job simulations <ArrowRight size={14}/></button></section><div className="grid gap-4 sm:grid-cols-3"><Stat label="Career track" value={career.title}/><Stat label="Baseline score" value={`${saved.assessment.percentage}%`}/><Stat label="Mission 01" value={saved.missionAttempt?`${saved.missionAttempt.score}/100`:'Not started'}/></div><section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-sm font-bold">Baseline topic review</h2><p className="mt-1 text-xs text-slate-400">Your initial knowledge check. This is not a professional proficiency score.</p><div className="mt-5 space-y-3">{saved.assessment.topics.map(t=><div key={t.topic} className="flex items-center justify-between rounded-xl bg-slate-50 p-4 text-xs"><span className="font-medium">{t.topic}</span><span className={t.correct?'font-semibold text-emerald-600':'font-semibold text-amber-600'}>{t.correct?'Correct':'Practice recommended'}</span></div>)}</div></section></>
 }
 return <div className="min-h-screen bg-[#f7f8fc] text-slate-900"><div className="flex min-h-screen"><aside className="hidden w-[258px] flex-col border-r border-slate-200 bg-white px-5 py-6 lg:flex"><Brand/><div className="mb-3 mt-10 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Workspace</div>{navItems.map(({label,icon:Icon})=><button key={label} onClick={()=>setActive(label)} className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm ${active===label?'bg-blue-50 font-semibold text-blue-700':'text-slate-500 hover:bg-slate-50'}`}><Icon size={17}/>{label}</button>)}<div className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-4"><div className="grid h-9 w-9 place-items-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">{initials}</div><div className="min-w-0 flex-1"><div className="truncate text-xs font-semibold">{saved.profile.name}</div><div className="text-[10px] text-slate-400">{career.title}</div></div><button onClick={reset} title="Reset demo profile"><LogOut size={15}/></button></div></aside><main className="min-w-0 flex-1"><header className="flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8"><div><div className="text-xs text-slate-400">Workspace / {active}</div><div className="text-sm font-semibold">{active}</div></div><div className="text-xs font-semibold text-slate-500">{saved.profile.name} · {career.title}</div></header><div className="mx-auto max-w-[1200px] space-y-6 px-5 py-8 sm:px-8">{renderWorkspace()}<p className="text-center text-[10px] text-slate-400">S.O.L.O. · Level up. Prove yourself.</p></div></main></div></div>
}
const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Mission Center', icon: BriefcaseBusiness },
  { label: 'Skill Intelligence', icon: BarChart3 },
  { label: 'Learning Roadmap', icon: BookOpen },
  { label: 'Performance', icon: Activity },
  { label: 'AI Mentor', icon: Sparkles }
]
export default App
function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-3 text-xl font-bold text-slate-950">
        {value}
      </div>
    </div>
  )
}