'use client'
import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { ApiKeyStore } from '@/stores/ApiKeyStore'
import { FileTypeStore } from '@/stores/FileTypeStore'

function InputField({hasButton}:{hasButton: boolean}) {
  const { userFileType, updateFileType } = FileTypeStore()
  const {apikey} = ApiKeyStore()

  const [inputValue, setInputValue] = useState('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateFileType(null)
      
      const myUrl = e.target.value
      setInputValue(myUrl)
      if (myUrl.trim().length > 0) {
        updateFileType(myUrl)
      } else {
        updateFileType(null)
      }
    }
  return (
    <div className={`flex ${hasButton ? 'flex-row' : 'justify-center items-center'} overflow-hidden rounded-md w-200`}>
        <input value={inputValue} onChange={handleInput} type="text" className={`${hasButton ? 'w-200' : 'w-130'} active:border-lime-600 px-2 rounded-md h-8 bg-neutral-950 text-neutral-300`} placeholder='Url'/>
        {
          hasButton && (
            <button className='bg-lime-400 w-10 h-8 flex justify-center items-center'>
            <Search/>
          </button>
          )
        }
    </div>
  )
}

export default InputField