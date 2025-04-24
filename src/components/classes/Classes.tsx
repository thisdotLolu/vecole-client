'use client'
import React, { useEffect } from 'react'
import { useFetch } from '@/app/hooks/useFetch'
import ClassesTable from './ClassesTable';
import CreateClass from './CreateClass';

interface Class{
  name?:string;
  grade?:string;
  id?:string;
  students?:{email:string,role:string,id:string},
  teacher_id?:string
  }
  
  interface ClassResponse {
    data: Class[]
  }

function Classes() {
      const { data, error, execute } = useFetch<ClassResponse>({
        url: '/api/classes',
      })
    
      useEffect(() => {
        execute()
      }, [])

      console.log(data)


  return (
    <div className='w-full p-[20px]'>
    <div className='w-full flex items-center justify-end'>
      <CreateClass/>
    </div>
    <ClassesTable tableData={data?.data || []} />
    {error && <p className="text-red-500 mt-4">{error}</p>}
  </div>
  )
}

export default Classes