import React, { useEffect } from 'react'
import { ApiKeyStore } from '@/stores/ApiKeyStore'

function ScanResult() {
  const { responses, analysis, updateAnalysis } = ApiKeyStore()

  useEffect(() => {
    const handleAnalysis = async () => {
      if (!responses) return

      const analysisData = { id: responses }

      try {
        const response = await fetch('http://localhost:8000/api/analyses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(analysisData),
        })

        const result = await response.json()
        if (result?.data?.attributes?.stats) {
          updateAnalysis(result.data.attributes.stats)
        }
      } catch (err) {
        console.error('Error fetching analysis:', err)
      }
    }

    handleAnalysis()
  }, [responses, updateAnalysis])

  if (!analysis || Object.keys(analysis).length === 0) {
    return null
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-lime-600 text-2xl font-semibold mb-4">
        Analysis Summary
      </h3>

      <div className="flex gap-3 text-sm w-170 justify-center items-center p-3">
        {Object.entries(analysis).map(([key, value]) => (
          <div key={key} className="flex justify-center items-center  gap-2 w-40">

            <span className="capitalize text-lime-600">{key}:</span>
            <span className="font-semibold text-lime-600">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScanResult
