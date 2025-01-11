'use client'

import { useDecisionStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ViewResultsProps {
  onBack: () => void
  onFinish: () => void
}

export default function ViewResults({ onBack, onFinish }: ViewResultsProps) {
  const { problemStatement, criteria, options, saveDecision, exportToPDF } = useDecisionStore()

  const calculateScore = (option: any) => {
    return criteria.reduce((total, criterion) => {
      const score = option.scores[criterion.id] || 0
      return total + (score * criterion.weight) / 100
    }, 0)
  }

  const sortedOptions = [...options].sort((a, b) => calculateScore(b) - calculateScore(a))

  const chartData = sortedOptions.map((option) => ({
    name: option.name,
    score: calculateScore(option),
  }))

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Decision Results</h2>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Problem Statement</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{problemStatement}</p>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Results Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Detailed Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Option</th>
                {criteria.map((criterion) => (
                  <th key={criterion.id} className="text-left">
                    {criterion.name} ({criterion.weight}%)
                  </th>
                ))}
                <th className="text-left">Total Score</th>
              </tr>
            </thead>
            <tbody>
              {sortedOptions.map((option) => (
                <tr key={option.id}>
                  <td>{option.name}</td>
                  {criteria.map((criterion) => (
                    <td key={criterion.id}>{option.scores[criterion.id] || 0}</td>
                  ))}
                  <td>{calculateScore(option).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <div className="space-x-2">
          <Button onClick={saveDecision}>Save Decision</Button>
          <Button onClick={exportToPDF}>Export to PDF</Button>
          <Button onClick={onFinish}>Finish</Button>
        </div>
      </div>
    </div>
  )
}

