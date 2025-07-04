'use client'
import React, { useState, useEffect } from 'react'

function LoadingBar({ onComplete, start }: { onComplete?: () => void, start: boolean }) {
  const [progress, setProgress] = useState<number>(0)
  const [showLoadingText, setShowLoadingText] = useState(true)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (!start) return

    setProgress(0) 
    setFinished(false)

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setFinished(true)
          return 100
        }
        return prev + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [start, onComplete])

  useEffect(() => {
    if (finished) {
      const delay = setTimeout(() => {
        onComplete?.()
      }, 300) // Optional small delay
      return () => clearTimeout(delay)
    }
  }, [finished, onComplete])

  if (!start) return null 

  return (
    <div className='flex flex-col h-48 w-full justify-center items-center gap-2'>
      {showLoadingText && <p className='text-lime-600'>Loading...</p>}
      <div className='bg-lime-300 w-96 h-2 rounded-3xl'>
        <div
          className="h-2 bg-rose-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default LoadingBar
