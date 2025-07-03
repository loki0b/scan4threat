'use client'
import React, { useState, useEffect } from 'react'

function LoadingBar() {
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState<number>(0)
    useEffect(() => {
    startLoading();
    }, [])
    useEffect(() => {
          if(loading) {
            const interval = setInterval(() => {
              setProgress(prevProgress => {
                if (prevProgress >= 100) {
                  clearInterval(interval)
                  return 100
                }
                return prevProgress + 10;
              })
            }, 500)
            return () => clearInterval(interval)
          }
        }, [loading])
    
        const startLoading = () => {
        setLoading(true);
        setProgress(0);}
    return (
        <div className='flex flex-col h-48 w-full justify-center items-center gap-2'>
            <p className='text-lime-600'>Loading...</p>
            <div className='bg-lime-300 w-120 h-2 rounded-3xl'>
                <div
                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    )
}

export default LoadingBar