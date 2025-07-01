'use client'
import React, { useState, useRef } from 'react'
import TopBar from '@/components/TopBar'
import Image from 'next/image'
import Logo from '@/assets/scan4threat.png'
import { title } from 'process'
import { File, Search } from 'lucide-react'
import InputField from '@/components/InputField'

function Home() {
  const myButtons = [
    {id: 1, title: "File"},
    {id: 2, title: "Url"}
  ]
  const [clickedButton, setClickedButton] = useState<undefined | number>(1)
  const handleClick = (bttn: number) => (
    setClickedButton(bttn)
  )
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = e.target.files
    if (fileUploaded && fileUploaded.length === 1){
      const file = fileUploaded[0]
    }
  }
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const handleClickInput = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => (
    hiddenFileInput.current?.click()
  )
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
            <div key={btn.id} onClick={() => handleClick(btn.id)} className={`flex justify-center items-center rounded-lg h-8 w-32 text-md font-medium ${btn.id === clickedButton? ' text-lime-800 bg-lime-500 hover:bg-lime-600 hover:text-lime-950' : 'bg-neutral-900 text-lime-700 hover:bg-neutral-950 hover:text-lime-600'}`}>
              {btn.title}
            </div>
          ))
          }
        </div>
        <div className='flex justify-center items-center mt-4 bg-neutral-900 w-170 h-56 rounded-lg'>
          {
            clickedButton === 1 ?
            <div onClick={handleClickInput} className='flex flex-col justify-center items-center h-32 w-32 rounded-lg border-3 border-lime-600 text-lime-600 hover:bg-lime-600 hover:text-neutral-900'>
              <File size={65}/>
              <input ref={hiddenFileInput} onChange={handleChange} type="file" className='hidden'/>
              <p className='font-medium'>Choose File</p>
            </div>
            :
            <div className='flex flex-row gap-2'>
              <input type="text" className='w-130 px-2 rounded-md h-8 bg-neutral-950 text-neutral-300' placeholder='Url'/>
            <button className='w-8 h-8 rounded-md flex items-center justify-center bg-lime-600 text-neutral-800'>
              <Search/>
            </button>
            </div>
          }
        </div>
        <span className='text-sm text-lime-950 mt-16'>
        @2025 | Made by: Loki0b & EnnalyC
      </span>
      </div>    
    </div>
  )
}

export default Home