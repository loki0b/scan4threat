import React from 'react'
import { ApiKeyStore } from '@/stores/ApiKeyStore'

function ScanResult() {
    const {response, analisys, updateAnalisys} = ApiKeyStore()

  const handleAnalisys = async () => {
    if (response === '') {
        return
    }

    updateAnalisys('')
    
    if (response === '200') {
        try {
        setResponseMsg('')
        setError(null)

        const url = {
        urlLink: userFileType,
        type: 'url',
    }

        const response = await fetch(`http://localhost:8000/api/scan`, {
        method: 'POST',
        headers: {
        "Content-Type": "application/json", 
        },
        body: JSON.stringify(url),
        })
        const result = await response.json()
        setResponseMsg(result.message)
        console.log(responseMsg)
        await minimumLoadingTime
    } catch (error: unknown) {
        if (error instanceof Error) {
        setError(error.message)
        } else {
        setError('An unknown error occurred')
        }
    } finally {
        setLoading(false)
        updateLoadingBar(false)
    }
    } else {
        try {

        const formData = new FormData()
        formData.append('myFile', userFileType)

        const response = await fetch(`http://localhost:8000/scanFile`, {
            method: 'POST',
            body: formData,
        })
        const result = await response.json()
        setResponseMsg(result.message)
        await minimumLoadingTime
        } catch (error: unknown) {
        if (error instanceof Error) {
            setError(error.message)
        } else {
            setError('An unknown error occurred')
        }
        } finally {
        setLoading(false)
        updateLoadingBar(false)
        }
    }
    }

    return (
      <div>

      </div>
    )
}

export default ScanResult