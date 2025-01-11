'use client'

import { useState } from 'react'
import { useDecisionStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface DefineOptionsProps {
  onBack: () => void
  onNext: () => void
}

export default function DefineOptions({ onBack, onNext }: DefineOptionsProps) {
  const [newOption, setNewOption] = useState('')
  const { options, addOption } = useDecisionStore()

  const handleAddOption = (e: React.FormEvent) => {
    e.preventDefault()
    if (newOption.trim()) {
      addOption(newOption.trim())
      setNewOption('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Define Your Options</h2>
      <form onSubmit={handleAddOption} className="mb-6">
        <Label htmlFor="new-option">New Option</Label>
        <div className="flex space-x-2">
          <Input
            id="new-option"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="Enter an option"
            className="flex-grow"
          />
          <Button type="submit">Add</Button>
        </div>
      </form>
      <div className="space-y-2 mb-6">
        {options.map((option) => (
          <div key={option.id} className="p-2 bg-gray-100 rounded">
            {option.name}
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Tip: Try to come up with diverse options that address your problem statement from different angles.
      </p>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={options.length === 0}>
          Next: Evaluate Options
        </Button>
      </div>
    </div>
  )
}

