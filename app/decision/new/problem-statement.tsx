'use client'

import { useState } from 'react'
import { useDecisionStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ProblemStatementProps {
  onComplete: () => void
}

export default function ProblemStatement({ onComplete }: ProblemStatementProps) {
  const [statement, setStatement] = useState('')
  const setProblemStatement = useDecisionStore((state) => state.setProblemStatement)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProblemStatement(statement)
    onComplete()
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Define Your Problem</h2>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="problem-statement">Problem Statement</Label>
        <Input
          id="problem-statement"
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          placeholder="Enter a clear and concise problem statement"
          className="mb-4"
        />
        <p className="text-sm text-gray-600 mb-4">
          Tip: A good problem statement is specific, measurable, and focuses on the outcome you want to achieve.
        </p>
        <Button type="submit">Next: Define Criteria</Button>
      </form>
    </div>
  )
}

