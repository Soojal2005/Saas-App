import { Button } from '@/components/ui/button'
import React from 'react'
import CompanianCard from '@/components/Companioncard.tsx'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'

const Page = () => {
  return (
    <main>
      <h1 className='text-2xl underline'>Popular Companion</h1>
     <section className='home-section'>
      <CompanianCard
      id = "123"
      name="Countsy the no. Wizard"
      topic="Derivatives & Integrals"
      subject = "Math"
      duration={30}
      color="e%d0ff"
       />
       <CompanianCard
      id = "123"
      name="Countsy the no. Wizard"
      topic="Derivatives & Integrals"
      subject="Science"
      duration={30}
      color="e%d0ff"
       />
       <CompanianCard
      id = "123"
      name="Countsy the no. Wizard"
      topic="Derivatives & Integrals"
      subject="History"
      duration={30}
      color="e%d0ff"
       />
    
     </section>
     <section className='home-section '>
      <CompanionList 
      title = "Recently completed sessions"
      companions = {recentSessions}
      classNames = "w-2/3 max-lg:w-full"
      />
      <CTA/>
      </section>
    </main>
  )
}

export default Page