import { cookies } from "next/headers";
import Image from "next/image";

export default async function Home() {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token');

  console.log("token",token)
  return (
   <div className='w-full'>
    
   </div>
  );
}
