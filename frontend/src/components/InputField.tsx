import React from 'react'
import { Search } from 'lucide-react'

function InputField() {
  return (
    <div className='bg-neutral-950 flex flex-row w-200 overflow-hidden rounded-sm'>
        <input type="text" placeholder='Url' className='h-8 text-sm w-200 rounded-sm p-2 bg-neutral-950 text-neutral-100'/>
        <button className='bg-lime-400 w-10 h-8 flex justify-center items-center'>
            <Search/>
        </button>
    </div>
  )
}

export default InputField