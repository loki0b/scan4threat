'use client'
import React, { useEffect } from 'react'
import TopBar from '@/components/TopBar'
import Image from 'next/image'
import Logo from '@/assets/scan4threat.png'
import FileSelector from '@/components/FileSelector'
import LoadingBar from '@/components/LoadingBar'
import { ApiKeyStore } from '@/stores/ApiKeyStore'
import FileTypeButtons from '@/components/FileTypeButtons'
import { FileTypeStore } from '@/stores/FileTypeStore'
import InputField from '@/components/InputField'
import ScanButton from '@/components/ScanButton'
import ScanResult from '@/components/ScanResult'

function Home() {
  const {apikey, showLoadingBar, updateLoadingBar, analysis} = ApiKeyStore()
  const { fileTypes, updateFileType } = FileTypeStore()

  useEffect(() => {
    if (!apikey) {
      updateLoadingBar(false);
      updateFileType(null);
    }
  }, [apikey])
  console.log('Estado analysis:', analysis)


  return (
    <div>
      <TopBar/>
      <div className='flex flex-col justify-center items-center'>
        <Image className='w-110 mt-16 h-12 object-cover' src={Logo} alt='logo'/>
        <p className='text-md mt-4 text-rose-500 w-170'>We scrutinize files, domains, IP addresses, and URLs for indications of malware and security compromises, automatically disseminating our findings to the broader security community.</p>
        <FileTypeButtons/>
        {
          showLoadingBar ? (
            <div className='flex flex-col justify-center items-center mt-4 bg-neutral-900 w-170 h-56 rounded-lg'>
              <LoadingBar
                start={true}
                onComplete={() => {
                  updateLoadingBar(false)
                }}
              />
            </div>
          )
          :
          <div className='mt-4 bg-neutral-900 w-170 h-56 rounded-lg'>
              <div className='gap-2 flex flex-col justify-center items-center mt-4'>
                {
                  fileTypes === 'Url' ?
                  <div className='flex flex-col gap-2 justify-center items-center mt-16 w-170'>
                    <InputField
                      hasButton={false}
                    />
                    <ScanButton/>
                  </div>
                  :
                  <div className='flex justify-center items-center mt-8 w-170'>
                    {
                      analysis ?
                      <ScanResult/>
                      :
                      <span>Scan an Url to see the result.</span>
                    }
                  </div>
                }
              </div>
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
