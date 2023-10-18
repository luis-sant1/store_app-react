import './bulma.css'
import { useEffect, useState } from 'react'
export function Error(error) {
  
    
    const toArr = Object.values(error)
   
    return (
        <>
            <div className="icon-text">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                <span>Error</span>
            </div>

            <p className="block">
                There was an error in your submission: {toArr}. <a href="#">Please try again</a>.
            </p>
        </>
    )
}