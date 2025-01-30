import Link from 'next/link'
import React, { useState } from 'react'
import { IoMdSearch } from 'react-icons/io'

const Categories = ({setSearchOpen}) => {
  return (
    <div className='flex items-center justify-between gap-5'>
        <div className='flex items-center gap-3 overflow-x-auto whitespace-nowrap'>
            <Link  href={`/category/1`} className='px-3 py-1 rounded-full bg-[#F3F4F6]'>Covid 19</Link>
            <Link  href={`/category/1`} className='px-3 py-1 rounded-full bg-[#F3F4F6]'>Covid 19</Link>
            <Link  href={`/category/1`} className='px-3 py-1 rounded-full bg-[#F3F4F6]'>Covid 19</Link>
            <Link  href={`/category/1`} className='px-3 py-1 rounded-full bg-[#F3F4F6]'>Covid 19</Link>
            <Link  href={`/category/1`} className='px-3 py-1 rounded-full bg-[#F3F4F6]'>Covid 19</Link>
            <Link  href={`/category/1`} className='px-3 py-1 rounded-full bg-[#F3F4F6]'>Covid 19</Link>
            <Link  href={`/category/1`} className='px-3 py-1 rounded-full bg-[#F3F4F6]'>Covid 19</Link>
            <Link  href={`/category/1`} className='px-3 py-1 rounded-full bg-[#F3F4F6]'>Covid 19</Link>
            <Link  href={`/category/1`} className='px-3 py-1 rounded-full bg-[#F3F4F6]'>Covid 19</Link> 
        </div>
        <button className='text-xl text-secondary' onClick={() => setSearchOpen(true)}>
          <IoMdSearch size={25}/>
        </button>
    </div>
  )
}

export default Categories