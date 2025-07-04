import React, { useState, useRef } from 'react'
import { KeyRound, X } from 'lucide-react'
import { ApiKeyStore } from '@/stores/ApiKeyStore'

function ApiTooltip() {
  const {updateApiKey, apikey} = ApiKeyStore()
  const [isOpen, setIsOpen] = useState(true)
  const [error, setError] = useState<unknown | Error>(null)
  const [myKey, setMyKey] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const handleIsOpen = () => {
    setIsOpen(!isOpen)
  }
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const myAPI = e.target.value
    setMyKey(myAPI)
    return myKey
  }
  const handleSendAPI = async () => {
    if (!myKey) {
      return 
    }
    try {
      const myAPIKEY = {
        APIKey: myKey
      }
      const response = await fetch('http://localhost:8000/myKey',{
        method: 'POST',
         headers: {
        "Content-Type": "application/json", 
        },
        body: JSON.stringify(myAPIKEY)
      })
      const result = await response.json()
    } catch (error: unknown) {
    if (error instanceof Error) {
      setError(error.message)
    }}
  }
  if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  const handleSetAPI = () => {
    updateApiKey(myKey)
  }
  
  return (
    <div>
      {
      isOpen && (
        <div className='flex justify-center items-center flex-col gap-2 h-64 w-100 bg-lime-600 text-neutral-900 rounded-lg'>
        <div onClick={handleIsOpen}><X size={24} className='absolute top-1.5 right-1.5'/></div>
        <KeyRound size={32}/>
        <p className='w-80'>We noticed you haven't included your API key. Please make sure to add it so we can proceed.</p>        {
          apikey ?
          <>
          <p className='text-neutral-900/70 text-2xl font-bold'>****************</p>
          <p onClick={() => updateApiKey(null)} className='text-neutral-900/60'>Change your API Key</p>
          </>
          :
          <>
          <input type='password' onChange={handleInput} placeholder='API Key' className='w-80 bg-lime-700/60 border border-lime-700 h-10 px-2 rounded-md  text-neutral-800/70'/>
          <button onClick={() => {handleSendAPI(), handleSetAPI()}} className='mt-2 bg-neutral-900 text-lime-600 h-8 w-24 rounded-lg hover:bg-neutral-800 hover:text-lime-500'>Send it</button>
          </>

        }
        </div>
      )
    }
    </div>
  )
}

export default ApiTooltip
