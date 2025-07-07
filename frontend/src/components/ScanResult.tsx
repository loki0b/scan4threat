import React from 'react'
import { ApiKeyStore } from '@/stores/ApiKeyStore'
import { resultTypes } from '@/lib/scanResultTypes'

function ScanResult() {
  const {responses, analysis, updateAnalysis} = ApiKeyStore()

  const handleAnalysis = async () => {
    if (responses === '') {
        return
    }
    const analysisData = {
      id: responses,
    }
    
    const response = await fetch('http://localhost:8000/api/analyses', {
      method: 'POST',
      headers: {
      "Content-Type": "application/json", 
      },
      body: JSON.stringify(analysisData)
    })
    const result = await response.json()

    if (result.results) {
      updateAnalysis(result.results)
    }
    
  }
    return (
      <div >
        {
          resultTypes.map((myId) => (
            <div key={myId.id}>
              <p>{myId.title}</p>
            </div>
          ))
        }
      </div>
    )
}

export default ScanResult