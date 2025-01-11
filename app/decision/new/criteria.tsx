'use client'

import { useState } from 'react'
import { useDecisionStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

interface DefineCriteriaProps {
  onBack: () => void
  onNext: () => void
}

export default function DefineCriteria({ onBack, onNext }: DefineCriteriaProps) {
  const [newCriterion, setNewCriterion] = useState('')
  const { criteria, addCriterion, updateCriterionWeight } = useDecisionStore()

  const handleAddCriterion = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCriterion.trim()) {
      addCriterion(newCriterion.trim())
      setNewCriterion('')
    }
  }

  const handleWeightChange = (id: string, weight: number) => {
    updateCriterionWeight(id, weight)
  }

  const totalWeight = criteria.reduce((sum, criterion) => sum + criterion.weight, 0)

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Define Evaluation Criteria</h2>
      <form onSubmit={handleAddCriterion} className="mb-6">
        <Label htmlFor="new-criterion">New Criterion</Label>
        <div className="flex space-x-2">
          <Input
            id="new-criterion"
            value={newCriterion}
            onChange={(e) => setNewCriterion(e.target.value)}
            placeholder="Enter a criterion"
            className="flex-grow"
          />
          <Button type="submit">Add</Button>
        </div>
      </form>
      <div className="space-y-4 mb-6">
        {criteria.map((criterion) => (
          <div key={criterion.id} className="space-y-2">
            <Label>{criterion.name}</Label>
            <Slider
              value={[criterion.weight]}
              onValueChange={(value) => handleWeightChange(criterion.id, value[0])}
              max={100}
              step={1}
            />
            <p className="text-sm text-gray-600">Weight: {criterion.weight}%</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Total weight: {totalWeight}% {totalWeight !== 100 && '(Weights should sum to 100%)'}
      </p>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={criteria.length === 0 || totalWeight !== 100}>
          Next: Define Options
        </Button>
      </div>
    </div>
  )
}

