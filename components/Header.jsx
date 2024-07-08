'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
    {name: 'posts', href: '/'},
    {name: 'create posts', href: '/addpost'}
]
const Header = () => {
    const path = usePathname()
  return (
    <header className='bg-pink-600'>
      <div className='flex flex-col items-center  z-10 sm:justify-between sm:flex-row fixed top-0 w-full p-6 bg-pink-600'>
        <Link href={'/'} className='text-2xl font-bold text-white  pb-4 sm:pb-0'>MamyBlog</Link>
        <div className='flex justify-center'>
        {nav.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`text-xl font-bold block px-4 py-2 rounded-full duration-300 ml-2 capitalize hover:bg-black-700 ${item.href === path ? 'text-white bg-black' : 'text-gray-500 bg-white'}`}
        >
          {item.name}
        </Link>
        ))}
        </div>
      </div>
    </header>
  )
}

export default Header