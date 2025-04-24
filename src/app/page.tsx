import HomePage from "@/components/HomePage";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token');
  console.log("token",token)
  return (
   <div className='w-full'>
    <HomePage/>
   </div>
  );
}
