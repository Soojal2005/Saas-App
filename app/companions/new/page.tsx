import CompanionForm from '@/components/CompanionForm';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { newCompanionPermission } from '@/lib/actions/companion.action';
import Image from 'next/image';
import Link from 'next/link';
const page = async () => {
  const { userId } = await auth();
  console.log('userId', userId);
  if (!userId) redirect('/signin');
  const canCreateCompanion = await newCompanionPermission();
  return (
    <main className='p-10 min-lg:w-1/3 min-mid:w-2/3 items-center justify-center mx-auto'>
      {canCreateCompanion ? (
        <article className='flex flex-col items-center justify-center gap-4 w-full'>
          <h1>Companion Form</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className='companion-limit'>
          <Image src="/images/limit.svg" alt="Companion Limit Reached" width={360} height={230} />
          <div className='cta-badge'>
            Upgrade your plan
          </div>
          <h1>You've reached your limit</h1>
          <p>You've reached your companion limit Upgrade to create more companion and premium features.</p>
          <Link href="/subscription" className='btn-primary w-full justify center' >
          Upgrade My plan
          </Link> 
        </article>
      )}
    </main>
  )
}

export default page