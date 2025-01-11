'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProblemStatement from './problem-statement'
import DefineCriteria from './criteria'
import DefineOptions from './options'
import EvaluateOptions from './evaluate-options'
import ViewResults from './view-results'

export default function NewDecision() {
  const [step, setStep] = useState(1)
  const router = useRouter()

  const handleFinish = () => {
    // Here you can implement saving the decision or any other final actions
    router.push('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create a New Decision</h1>
      {step === 1 && <ProblemStatement onComplete={() => setStep(2)} />}
      {step === 2 && <DefineCriteria onBack={() => setStep(1)} onNext={() => setStep(3)} />}
      {step === 3 && <DefineOptions onBack={() => setStep(2)} onNext={() => setStep(4)} />}
      {step === 4 && <EvaluateOptions onBack={() => setStep(3)} onNext={() => setStep(5)} />}
      {step === 5 && <ViewResults onBack={() => setStep(4)} onFinish={handleFinish} />}
    </div>
  )
}

