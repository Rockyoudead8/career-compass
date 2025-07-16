import React from 'react'
import { Suspense } from 'react'
import { BarLoader } from 'react-spinners'
const layout = ({ children }) => {
    return (
        <div className='px-10'>
            <div className='flex items-center justify-between mb-5'>
               <h1 className='font-bold text-6xl gradient-background'>Industry Insights</h1>
            </div>
            <Suspense fallback={<BarLoader className='mt-4' width={"100%"} color='gray'/>}>{children}</Suspense>
        </div>
    )
}

export default layout
