'use client'
import React, { useState, useRef } from 'react'
import { File } from 'lucide-react'
import { ApiKeyStore } from '@/stores/ApiKeyStore'
import { FileTypeStore } from '@/stores/FileTypeStore'

function FileSelector() {
    const { userFileType, updateFileType } = FileTypeStore()
    const {apikey} = ApiKeyStore()
  
    const [myFileName, setMyFileName] = useState<undefined | string>(undefined)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFileType(null)
        setMyFileName(undefined)
    
        const fileUploaded = e.target.files
        if (fileUploaded && fileUploaded.length === 1){
          const file = fileUploaded[0]
          setMyFileName(file.name)
          updateFileType(file)
        }
    }
    
    const hiddenFileInput = useRef<HTMLInputElement>(null)
    const handleClickInput = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => (
    hiddenFileInput.current?.click()
    )

    return (
        <>
        <div onClick={handleClickInput} className='flex flex-col justify-center items-center h-32 w-32 rounded-lg border-4 border-lime-600 text-lime-600 hover:bg-lime-600 hover:text-neutral-900'>
              {
                userFileType ?
                
                <div className='flex flex-col justify-center items-center'>
                  <File size={65}/>
                  <input ref={hiddenFileInput} onChange={handleChange} type="file" className='hidden'/>
                  <p className='text-center font-medium w-24 truncate'>{myFileName}</p>
                </div>
                
                :
                
                <div className='flex flex-col justify-center items-center'>
                  <File size={65}/>
                  <input ref={hiddenFileInput} onChange={handleChange} type="file" className='hidden'/>
                  <p className='font-medium w-19 truncate text-center'>Select File</p>
                </div>
                
              }
            </div>
        </>
    )
}

export default FileSelector