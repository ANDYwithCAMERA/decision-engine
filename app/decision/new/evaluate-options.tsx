'use client'

import { useState } from 'react'
import { useDecisionStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

interface EvaluateOptionsProps {
  onBack: () => void
  onNext: () => void
}

export default function EvaluateOptions({ onBack, onNext }: EvaluateOptionsProps) {
  const { criteria, options, updateOptionScore } = useDecisionStore()

  const handleScoreChange = (optionId: string, criterionId: string, score: number) => {
    updateOptionScore(optionId, criterionId, score)
  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Evaluate Options</h2>
      <div className="space-y-8">
        {options.map((option) => (
          <div key={option.id} className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">{option.name}</h3>
            {criteria.map((criterion) => (
              <div key={criterion.id} className="mb-4">
                <Label className="mb-2 block">
                  {criterion.name} (Weight: {criterion.weight}%)
                </Label>
                <Slider
                  value={[option.scores[criterion.id] || 0]}
                  onValueChange={(value) => handleScoreChange(option.id, criterion.id, value[0])}
                  max={10}
                  step={1}
                  className="mb-1"
                />
                <p className="text-sm text-gray-600">
                  Score: {option.scores[criterion.id] || 0} / 10
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600 my-4">
        Tip: Consider each option's performance against each criterion carefully. Try to be as objective as possible in your scoring.
      </p>
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>Next: View Results</Button>
      </div>
    </div>
  )
}

