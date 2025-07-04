'use client'
import React, { useState, useRef, useEffect } from 'react'
import TopBar from '@/components/TopBar'
import Image from 'next/image'
import Logo from '@/assets/scan4threat.png'
import { File, Search } from 'lucide-react'
import LoadingBar from '@/components/LoadingBar'

function Home() {
  const myButtons = [
    {id: 1, title: "File"},
    {id: 2, title: "Url"}
  ]
  const [clickedButton, setClickedButton] = useState<number>(1)
  const [myFileName, setMyFileName] = useState<undefined | string>(undefined)
  const [myFile, setMyFile] = useState<File | null | string>(null)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = e.target.files
    if (fileUploaded && fileUploaded.length === 1){
      const file = fileUploaded[0]
      setMyFileName(file.name)
      setMyFile(file)
    }
  }
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyFileName(undefined)
    const myUrl = e.target.value
    if (myUrl.trim().length > 0) {
      setMyFile(myUrl)
    } 
  }
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const handleClickInput = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => (
    hiddenFileInput.current?.click()
  )
  const [loading, setLoading] = useState(false)
  const [responseMsg, setResponseMsg] = useState<string>('')
  const [error, setError] = useState<unknown | Error>(null)
  const handleScan = async () => {
  if (!myFile) {
    return
  }

  setLoading(true)
  setShowLoadingBar(true)

  const minimumLoadingTime = new Promise(resolve => setTimeout(resolve, 4000)) // 4 seconds


  if (typeof myFile === 'string') {
    try {

    const url = {
      urlLink: myFile,
    }

    const response = await fetch(`http://localhost:8000/scanUrl`, {
      method: 'POST',
      headers: {
      "Content-Type": "application/json", 
      },
      body: JSON.stringify(url),
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
    setShowLoadingBar(false)
  }
  } else {
      try {

      const formData = new FormData()
      formData.append('myFile', myFile)

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
      setShowLoadingBar(false)
    }
  }
}
  const handleClick = (bttn: number) => {
    setClickedButton(bttn)
    setMyFile(null)
    setMyFileName(undefined)
  }
  const [showLoadingBar, setShowLoadingBar] = useState(true)
  const handleLoadingBarComplete = () => {
    setShowLoadingBar(false)
  }
  return (
    <div>
      <TopBar/>
      <div className='flex flex-col justify-center items-center'>
        <Image className='w-110 mt-16 h-12 object-cover' src={Logo} alt='logo'/>
        <p className='text-md mt-4 text-rose-500 w-170'>We scrutinize files, domains, IP addresses, and URLs for indications of malware and security compromises, automatically disseminating our findings to the broader security community.</p>
        <div className='flex flex-row items-center gap-3 mt-8'>
          {
           myButtons.map((btn) => (
            <div key={btn.id} onClick={() => handleClick(btn.id)} className={`flex justify-center items-center rounded-lg h-8 w-32 text-md font-medium ${btn.id === clickedButton? ' text-lime-800 bg-lime-500 hover:bg-lime-400 hover:text-lime-800' : 'bg-neutral-900 text-lime-700 hover:bg-neutral-800 hover:text-lime-500'}`}>
              {btn.title}
            </div>
          ))
          }
        </div>
        {
          loading ? (
          <div className='flex flex-col justify-center items-center mt-4 bg-neutral-900 w-170 h-56 rounded-lg'>
            <LoadingBar
            start={true}
            onComplete={() => {
              setLoading(false)
              setShowLoadingBar(false)
            }}
          />
          </div>
          )
          :
            <div className='flex flex-col justify-center items-center mt-4 bg-neutral-900 w-170 h-56 rounded-lg'>
          {
            clickedButton === 1 ?
            <>
            <div onClick={handleClickInput} className='flex flex-col justify-center items-center h-32 w-32 rounded-lg border-4 border-lime-600 text-lime-600 hover:bg-lime-600 hover:text-neutral-900'>
              {
                myFile ?
                <div className='flex flex-col justify-center items-center'>
                  <File size={65}/>
                  <input ref={hiddenFileInput} onChange={handleChange} type="file" className='hidden'/>
                  <p className='font-medium w-24 truncate'>{myFileName}</p>
                </div>
                :
                <div className='flex flex-col justify-center items-center'>
                  <File size={65}/>
                  <input ref={hiddenFileInput} onChange={handleChange} type="file" className='hidden'/>
                  <p className='font-medium w-19 truncate'>Select File</p>
                </div>
              }
            </div>
            </>
            :
            <div>
              <input onChange={handleInput} type="text" className='w-130 px-2 rounded-md h-8 bg-neutral-950 text-neutral-300' placeholder='Url'/>
            </div>
          }
        <button
          disabled={!myFile || (typeof myFile === 'string' && myFile.trim().length === 0)}
          onClick={handleScan}
          className={`mt-2 h-8 w-32 rounded-md ${
            !myFile || (typeof myFile === 'string' && myFile.trim().length === 0)
              ? 'bg-neutral-800 text-lime-500 cursor-not-allowed'
              : 'bg-lime-600 text-neutral-800 hover:bg-lime-500'
          }`}
        >
          Scan
        </button>
        </div>
        }
        <span className='text-sm text-lime-950 mt-16'>
        @2025 | Made by: Loki0b & EnnalyC
      </span>
      </div>    
    </div>
  )
}

export default Home