import CompanionForm from '@/components/CompanionForm';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
const page = async() => {
  const {userId} = await auth();
  console.log('userId', userId);
  if(!userId) redirect('/signin');
  return (
    <main className='p-10 min-lg:w-1/3 min-mid:w-2/3 items-center justify-center mx-auto'>
        <article className='flex flex-col items-center justify-center gap-4 w-full'>
            <h1>Companion Form</h1>
            <CompanionForm/>
        </article>
    </main>
  )
}

export default page