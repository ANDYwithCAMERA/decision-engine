'use client'

import { useState, useEffect } from 'react'
import { useDecisionStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

interface ProblemStatementProps {
  onComplete: () => void
}

export default function ProblemStatement({ onComplete }: ProblemStatementProps) {
  // Initialize statement with existing problem statement from the store
  const existingStatement = useDecisionStore((state) => state.problemStatement)
  const [statement, setStatement] = useState(existingStatement || '') // Use existing or fallback to empty string
  const setProblemStatement = useDecisionStore((state) => state.setProblemStatement)

  useEffect(() => {
    setStatement(existingStatement || '') // Re-set statement if the store's problem statement changes
  }, [existingStatement])

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
        <div className="flex justify-between mt-6">
            <Link href="/">
            <Button variant="outline">Start Over</Button>
            </Link>
        <Button type="submit">Next: Define Criteria</Button>
        </div>
      </form>
    </div>
  )
}
