import { Button } from '@/components/ui/button'
import React from 'react'
import CompanianCard from '@/components/Companioncard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'

export const dynamic = 'force-dynamic'; 
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.action'
import { getSubjectColor } from '@/lib/utils'

const Page =async () => {
  const companions = await getAllCompanions({limit:3});
  const recentSessionCompanion = await getRecentSessions(10);
  console.log("==============================================",recentSessionCompanion);
  return (
    <main>
      <h1 className='text-2xl underline'>Popular Companion</h1>
     <section className='home-section'>
      {companions.map((companion)=>(
        <CompanianCard
        key = {companion.id}
        {...companion}
        color = {getSubjectColor(companion.subject)}
       />
      ))}
</section>
     <section className='home-section '>
      <CompanionList 
      title = "Recently completed sessions"
      companions = {recentSessionCompanion}
      classNames = "w-2/3 max-lg:w-full"
      />
      <CTA/>
      </section>
    </main>
  )
}

export default Page