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
      <div className='flex flex-col justify-center items-center'>
        <p className='text-lime-600 text-2xl font-semibold mt-12'>Your file is {analysis}</p>
        <div className='flex flex-row justify-between gap-3 p-8'>
        {
          resultTypes.map((myId) => (
            <div key={myId.id} className={`flex gap-1 items-center text-sm`}>
              <div className={`rounded-full h-2 w-2 ${analysis === myId.title ? 'bg-lime-600' : 'bg-neutral-950'}`}/>
              <p className={`${analysis === myId.title ? 'text-lime-600' : 'text-neutral-950'}`}>{myId.title}</p>
            </div>
          ))
        }
      </div>
      </div>
    )
}

export default ScanResult