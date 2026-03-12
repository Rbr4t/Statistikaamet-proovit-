import { useState } from 'react'
import './Question.css'

type Props = {
  question: 
  {
    text: string
    options: string[]
    correct: string
  }
  current: number
  total: number
  onNext: (answer: { question: string; selected: string; correct: string }) => void
  isLast: boolean
}

function Question({ question, current, total, onNext, isLast }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState<boolean>(false)

  function handleNext() {
    if (!selected) return
    onNext({ question: question.text, selected, correct: question.correct })
    setSelected(null)
    setConfirmed(false)
  }

  return (
    <div className="question-card">
      <span className="question-tag">KÜSIMUS {current} / {total}</span>
      <h3>{question.text}</h3>

      <div className="question-options">
        {question.options.map(opt => (
          <button
            key={opt}
            className={`option
              ${selected === opt && !confirmed ? 'option-selected' : ''}
              ${confirmed && opt === question.correct ? 'option-correct' : ''}
              ${confirmed && selected === opt && opt !== question.correct ? 'option-wrong' : ''}
            `}
            onClick={() => !confirmed && setSelected(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      {confirmed && (
        <div className={`feedback ${selected === question.correct ? 'feedback-correct' : 'feedback-wrong'}`}>
          {selected === question.correct
            ? 'Õige vastus!'
            : `Vale. Õige vastus: ${question.correct}`}
        </div>
      )}

      <div className="question-actions">
        {!confirmed
          ? <button className="question-btn" onClick={() => setConfirmed(true)} disabled={!selected}>Vasta</button>
          : <button className="question-btn" onClick={handleNext}>{isLast ? 'Vaata tulemusi' : 'Järgmine'}</button>
        }
      </div>
    </div>
  )
}

export default Question