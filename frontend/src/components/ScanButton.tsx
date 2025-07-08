'use client'
import React, {useState, useEffect} from 'react'
import { ApiKeyStore } from '@/stores/ApiKeyStore'
import { FileTypeStore } from '@/stores/FileTypeStore'

function ScanButton() {
    const {apikey, updateLoadingBar, updateResponse, updateAnalysis, responses} = ApiKeyStore()
    const { userFileType } = FileTypeStore()

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
    if (!userFileType) return

    updateLoadingBar(true)
    const minimumLoadingTime = new Promise(resolve => setTimeout(resolve, 4000))

    if (typeof userFileType === 'string') {
      try {
        updateResponse('')
        setError(null)

        const urlPayload = {
          urlLink: userFileType,
          type: 'url',
        }

        const response = await fetch(`http://localhost:8000/api/scan`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(urlPayload),
        })

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        let result = await response.json();

        if (typeof result === 'string') {
            try {
                result = JSON.parse(result);
            } catch (parseError) {
                throw new Error('Could not parse backend response as valid JSON object.');
            }
        }

        await minimumLoadingTime;

        const urls = result.data;
        if (!urls || typeof urls.id === 'undefined') {
            throw new Error('Could not extract ID from scan response.');
        }
        const id = urls.id;

        updateResponse(id);

        const pollAnalysis = async (analysisId: string): Promise<any> => {
          while (true) {
            const analysisResponse = await fetch('http://localhost:8000/api/analyses', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: analysisId }),
            });

            if (!analysisResponse.ok) {
              const errorText = await analysisResponse.text();
              throw new Error(`Analysis API Error: ${analysisResponse.status} - ${errorText}`);
            }

            const rawResponseText = await analysisResponse.text();

            let analysisResult;
            try {
                const unescapedString = JSON.parse(rawResponseText); 
                const parts = unescapedString.split('\n');
                
                let jsonPart = '';
                if (parts.length > 1) {
                    jsonPart = parts[1];
                } else {
                    jsonPart = unescapedString;
                }

                analysisResult = JSON.parse(jsonPart); 

            } catch (parseError) {
                throw new Error('Could not parse backend analysis response as valid JSON.');
            }

            const status = analysisResult.data?.attributes?.status;

            if (status === 'completed') {
              return analysisResult.data.attributes.stats;
            }

            await new Promise(resolve => setTimeout(resolve, 1500));
          }
        };

        const stats = await pollAnalysis(id);
        updateAnalysis(stats);

      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Ocorreu um erro desconhecido');
        }
      } finally {
        updateLoadingBar(false);
      }
    } else {
        try {
            const formData = new FormData()
            formData.append('uploadedFile', userFileType)  
            formData.append('type', 'file') 

            const response = await fetch(`http://localhost:8000/api/scan`, {
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
            updateLoadingBar(false)
        }
    }
  };
    
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

export default ScanButton;
