import { Facebook, Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const footer = () => {
    return (
        <div className=" bg-background py-12 relative bottom-0  w-full space-y-6">
            <h1 className='font-bold text-center text-2xl '>All rights reserved &copy; 2025</h1>
            <div className='flex justify-center items-center gap-4'>
                <Link href="https://github.com/Rockyoudead8"><Github className='w-10 h-10 border-1 border-gray-300 rounded-full p-1 hover:bg-gray-300' /></Link>
                <Link href="https://www.linkedin.com/in/arpit-goyal-49429431b/"><Linkedin className='w-10 h-10 border-1 border-gray-300 rounded-full p-1 hover:bg-gray-300' /></Link>
            </div>
            <h1 className='text-center text-sm text-gray-500'>Contact us at <span className='text-blue-500'>arpitgoyal1941977@gmail.com</span></h1>
        </div>
    )
}

export default footer
