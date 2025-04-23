'use client'

import { signOutAction } from "@/app/actions";
import { useRouter } from "next/navigation";

function SignOut() {
  const router = useRouter()
  return (
    <form action={
      ()=>{
        signOutAction()
        router.push('/signin')
        router.refresh()
      }}>
      <button 
      type="submit" className="w-full text-left">
        Sign Out
      </button>
    </form>
  );
}

export default SignOut;