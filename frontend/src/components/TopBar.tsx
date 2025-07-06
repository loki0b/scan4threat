'use client'
import React, { useState, useRef, useEffect } from 'react'
import Logo from '@/assets/scan4threat.png'
import Image from 'next/image'
import InputField from './InputField'
import { KeyRound } from 'lucide-react'
import { ApiKeyStore } from '@/stores/ApiKeyStore'
import ApiTooltip from './ApiTooltip'

function TopBar() {
    const { apikey, updateApiKey} = ApiKeyStore()
    const [isClicked, setIsClicked] = useState(false)
    const tooltipRef = useRef<HTMLDivElement>(null)
    const handleOnClick = () => {
        setIsClicked(!isClicked)
    }

    useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsClicked(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])
    return (
    <div className='flex gap-4'>
        <div className='flex flex-row justify-between px-24 items-center w-full h-16 bg-neutral-900'>
            <Image src={Logo} alt='logo' className='h-4 w-40 object-cover'/>
        <InputField 
        hasButton={true}
        />
        <button onClick={handleOnClick} className='flex flex-row gap-2 justify-center items-center w-48 h-8 bg-lime-400 rounded-xs text-neutral-900'>
                 <KeyRound size={18}/>   
                 <p>Add your API key</p>
        </button>
        </div>
        {
            isClicked && 
            <div ref={tooltipRef} className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                <ApiTooltip/>
            </div> 
        }
    </div>
  )
}

export default TopBar