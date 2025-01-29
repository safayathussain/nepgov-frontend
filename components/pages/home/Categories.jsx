import React from 'react'
import { IoMdSearch } from 'react-icons/io'

const Categories = () => {
  return (
    <div className='flex items-center justify-between gap-5'>
        <div className='flex items-center gap-3 overflow-x-auto whitespace-nowrap'>
            <button className='px-3 py-1 rounded-full bg-[#F3F4F6]'>Covid 19</button>
            <button className='px-3 py-1 rounded-full bg-[#F3F4F6]'>Covid 19</button>
            <button className='px-3 py-1 rounded-full bg-[#F3F4F6]'>Covid 19</button>
            <button className='px-3 py-1 rounded-full bg-[#F3F4F6]'>Covid 19</button>
            <button className='px-3 py-1 rounded-full bg-[#F3F4F6]'>Covid 19</button>
            <button className='px-3 py-1 rounded-full bg-[#F3F4F6]'>Covid 19</button>
            <button className='px-3 py-1 rounded-full bg-[#F3F4F6]'>Covid 19</button>
            <button className='px-3 py-1 rounded-full bg-[#F3F4F6]'>Covid 19</button>
            <button className='px-3 py-1 rounded-full bg-[#F3F4F6]'>Covid 19</button> 
        </div>
        <button className='text-xl text-secondary'>
          <IoMdSearch/>
        </button>
    </div>
  )
}

export default Categories