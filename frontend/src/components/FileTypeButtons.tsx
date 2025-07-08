'use client'
import React, { useState } from 'react'
import { FileTypeStore } from '@/stores/FileTypeStore'

function FileTypeButtons() {
    const { fileTypes, defineFileType } = FileTypeStore()

    const myButtons = [
        {id: 1, title: "Url"},
        {id: 2, title: "Results"}
      ]
    const [clickedButton, setClickedButton] = useState(1)
    
    const handleFileType = (theId: number) => {
        const button = myButtons.find(b => b.id === theId)
        if (button) {
          setClickedButton(button.id)
          defineFileType(button.title)
        }
    }

    return (
        <div className='flex flex-row items-center gap-3 mt-8'>
          {
           myButtons.map((btn) => (
            <div key={btn.id} onClick={() => handleFileType(btn.id)} className={`flex justify-center items-center rounded-lg h-8 w-32 text-md font-medium ${btn.id === clickedButton? ' text-lime-800 bg-lime-500 hover:bg-lime-400 hover:text-lime-800' : 'bg-neutral-900 text-lime-700 hover:bg-neutral-800 hover:text-lime-500'}`}>
              {btn.title}
            </div>
          ))
          }
        </div>
    )
}

export default FileTypeButtons