import { SignIn } from "@clerk/nextjs"
const page = () => {
  return (
    <main className="flex items-center justify-center min-h-screen  bg-gray-100">
      <SignIn/>
    </main>
  )
}

export default page;