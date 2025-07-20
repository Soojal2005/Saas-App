import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CTA() {
  return (
    <section className='cta-badge flex flex-col items-center justify-center  rounded-lg shadow-lg w-[30%]'>
        <div className='cta-badge'>Start learning your way </div>
        <h2 className='text-3xl font-bold'>Build and Personalize your learning</h2>
        <p>Pick a name, subject, voice, & personality and start Learning through voice conversations that frrl natural and fun.</p>
        <Image src={"/images/cta.svg"} alt="CTA Image" width={362} height={262} className='w-full max-w-[500px] h-auto' />
        <button className='btn-primary'>
             <Image src="/icons/plus.svg" alt='plus' width={12} height={12}/> 
            <Link href = "/companions/new" className='btn-secondary'>
            <p>Build a New Companion</p>
            </Link>
        </button>
           </section>
  )
}
