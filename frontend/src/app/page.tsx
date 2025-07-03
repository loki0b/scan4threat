'use client'
import React, { useState, useRef, useEffect } from 'react'
import TopBar from '@/components/TopBar'
import Image from 'next/image'
import Logo from '@/assets/scan4threat.png'
import { File, Search } from 'lucide-react'
import InputField from '@/components/InputField'
import LoadingBar from '@/components/LoadingBar'

function Home() {
  const myButtons = [
    {id: 1, title: "File"},
    {id: 2, title: "Url"}
  ]
  const [clickedButton, setClickedButton] = useState<undefined | number>(1)
  const handleClick = (bttn: number) => (
    setClickedButton(bttn)
  )
  const [myFileName, setMyFileName] = useState<undefined | string>(undefined)
  const [myFile, setMyFile] = useState<File | null>(null)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = e.target.files
    if (fileUploaded && fileUploaded.length === 1){
      const file = fileUploaded[0]
      setMyFileName(file.name)
      setMyFile(file)
    }
  }
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const handleClickInput = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => (
    hiddenFileInput.current?.click()
  )
  const [loading, setLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)
  const [responseMsg, setResponseMsg] = useState<string>('')
  const [error, setError] = useState<unknown | Error>(null)
  const handleScan = async () => {
  if (!myFile) {
    setIsEmpty(true)
    setLoading(false)
    return
  }

  setIsEmpty(false)
  setLoading(true)

  try {

    const formData = new FormData()
    formData.append('methodUsed', 'POST')
    formData.append('content', myFile)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scan`, {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()
    setResponseMsg(result.message)
  } catch (error: unknown) {
    if (error instanceof Error) {
      setError(error.message)
    } else {
      setError('An unknown error occurred')
    }
  } finally {
    setLoading(false)
  }
}

  const [isTriggered, setIsTriggered] = useState(false)
  const handleTriggering = () => {
    isEmpty ? setIsTriggered(true)
    :
    handleScan()


  }
  return (
    <div>
      <TopBar/>
      <div className='flex flex-col justify-center items-center'>
        <Image className='w-110 mt-16 h-12 object-cover' src={Logo} alt='logo'/>
        <p className='text-md mt-4 text-rose-500 w-170'>We scrutinize files, domains, IP addresses, and URLs for indications of malware and security compromises, automatically disseminating our findings to the broader security community.</p>
        <div className='flex flex-row items-center gap-3 mt-8'>
          {
           clickedButton && 
           myButtons.map((btn) => (
            <div key={btn.id} onClick={() => handleClick(btn.id)} className={`flex justify-center items-center rounded-lg h-8 w-32 text-md font-medium ${btn.id === clickedButton? ' text-lime-800 bg-lime-500 hover:bg-lime-400 hover:text-lime-800' : 'bg-neutral-900 text-lime-700 hover:bg-neutral-800 hover:text-lime-500'}`}>
              {btn.title}
            </div>
          ))
          }
        </div>
        {
          loading ?
          <LoadingBar/>
          :
          isEmpty && (
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
            {
            isTriggered && 
            <div className='mt-2 flex justify-center h-6 w-85 rounded-md bg-lime-600/60'>
              <p className='text-md text-neutral-900'>You must choose a file in order to scan it.</p>
            </div>
            }
            </>
            :
            <div>
              <input type="text" className='w-130 px-2 rounded-md h-8 bg-neutral-950 text-neutral-300' placeholder='Url'/>
            </div>
          }
        <button onClick={handleTriggering} className='mt-2 h-8 w-32 rounded-md active:bg-lime-500 active:text-neutral-800 bg-lime-600 text-neutral-800'>Scan</button>
        </div>
          )
        }
        <span className='text-sm text-lime-950 mt-16'>
        @2025 | Made by: Loki0b & EnnalyC
      </span>
      </div>    
    </div>
  )
}

export default Home