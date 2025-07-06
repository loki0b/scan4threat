'use client'
import React, {useState, useEffect} from 'react'
import { ApiKeyStore } from '@/stores/ApiKeyStore'
import { FileTypeStore } from '@/stores/FileTypeStore'

function ScanButton() {
    const {apikey, updateLoadingBar, updateResponse} = ApiKeyStore()
    const { userFileType } = FileTypeStore()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<unknown | Error>(null)
    const [missingAPI, setMissingAPI] = useState<boolean>(true)
    
    useEffect(() => {
        if (!apikey) {
            setMissingAPI(true);
            updateResponse('');
            setError(null);
        } else {
          setMissingAPI(false);
        }
      }, [apikey])

    const handleScan = async () => {
    if (!userFileType) {
        return
    }

    setLoading(true)
    updateLoadingBar(true)
    const minimumLoadingTime = new Promise(resolve => setTimeout(resolve, 4000)) 


    if (typeof userFileType === 'string') {
        try {
        updateResponse('')
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
        updateResponse(result.message)
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
        updateResponse(result.message)
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
        <>
        <button
                disabled={!userFileType || (typeof userFileType === 'string' && userFileType.trim().length === 0) || missingAPI}
                onClick={handleScan}
                className={`mt-1 h-8 w-32 rounded-md ${
                    !userFileType || (typeof userFileType === 'string' && userFileType.trim().length === 0) || missingAPI
                    ? 'bg-neutral-800 text-lime-500 cursor-not-allowed'
                    : 'bg-lime-600 text-neutral-800 hover:bg-lime-500'
                }`}
                >
                Scan
        </button>
        {
            missingAPI && (
              <div className='h-6 w-96 text-center rounded-md text-lime-600/70 text-sm'>
                <p>You must input your API Key in order to scan it.</p>
              </div>
            )
          }
        </>
    )
}

export default ScanButton