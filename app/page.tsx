'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useDecisionStore } from '@/lib/store'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const loadDecision = useDecisionStore((state) => state.loadDecision)
  const [error, setError] = useState<string | null>(null)
  const [showFileInput, setShowFileInput] = useState(false) // State to control file input visibility

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        await loadDecision(file)
        router.push('/decision/new')
      } catch (error) {
        setError('Error loading file. Please make sure it\'s a valid decision file.')
      }
    }
  }

  const handleShowFileInput = () => {
    setShowFileInput(true) // Show the file input when the button is clicked
  }

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Decision Engine</h1>
      <p className="text-xl mb-12 text-center max-w-2xl">
        Make structured decisions with ease. Create a new decision or load an existing one to get started.
      </p>
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <Link href="/decision/new">
          <Button size="lg" className="w-full">Create New Decision</Button>
        </Link>

        {/* Button to trigger showing the file input */}
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={handleShowFileInput} // Trigger the state change
        >
          Load Existing Decision
        </Button>

        {/* Conditionally render file input based on state */}
        {showFileInput && (
          <input
            id="load-decision"
            type="file"
            accept=".json"
            onChange={handleFileUpload}
          />
        )}
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  )
}
