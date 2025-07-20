import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const page = async () => {
  const authResult = await auth();
  console.log('Full auth result:', authResult);
  console.log('userId:', authResult.userId);
  console.log('sessionId:', authResult.sessionId);
  
  if (!authResult.userId) {
    console.log('No userId found, redirecting to sign-in');
    redirect('/sign-in');
  }
  
  return (
    // ... your component
    <h1>hello</h1>
  )
}