'use client'
import React, { useState } from 'react'
import Logo from '@/assets/scan4threat.png'
import Image from 'next/image'
import InputField from './InputField'
import { KeyRound } from 'lucide-react'
import { ApiKeyStore } from '@/stores/ApiKeyStore'
import ApiTooltip from './ApiTooltip'

function TopBar() {
    const { apikey, updateApiKey} = ApiKeyStore()
    const [isClicked, setIsClicked] = useState(false)
    const handleOnClick = () => {
        setIsClicked(!isClicked)
    }
    return (
    <>
        <div className='flex flex-row justify-between px-24 items-center w-full h-16 bg-neutral-900'>
            <Image src={Logo} alt='logo' className='h-4 w-40 object-cover'/>
        <InputField />
        <button onClick={handleOnClick} className='flex flex-row gap-2 justify-center items-center w-48 h-8 bg-lime-400 rounded-xs text-neutral-900'>
                 <KeyRound size={18}/>   
                 <p>Add your API key</p>
        </button>
        </div>
        {
            isClicked && 
            <div className=''>
                <ApiTooltip/>
            </div> 
        }
    </>
  )
}

export default TopBar