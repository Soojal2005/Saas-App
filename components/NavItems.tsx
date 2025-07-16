"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { use } from 'react'
const NavItems = () => {
     const navItems = [{label: 'Home', href: '/'},
          {label: 'Companions', href: '/companions'},
          {label: 'My Journey', href: '/my-journey'},
          {label: 'SignIn', href: '/signin'}]

      const pathname = usePathname();    
  return (
    <nav className='flex items-center gap-8'>
       {navItems.map((item, index) => (
          <Link key={index} href={item.href} className = {cn(pathname === item.href ? 'text-blue-500' : 'text-gray-700')}>
            <p>{item.label}</p>
          </Link>
         ))}
    </nav>
  )
}

export default NavItems