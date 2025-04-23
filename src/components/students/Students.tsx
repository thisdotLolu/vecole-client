'use client'
import React, { useEffect } from 'react'
import StudentsTable from './StudentsTable'
import { useFetch } from '@/app/hooks/useFetch'
import CreateStudent from './CreateStudent';

interface Student{
    email: string
    role: string;
    id:string
  }
  
  interface StudentResponse {
    data: Student[]
  }

function Students() {
      const { data, error, execute } = useFetch<StudentResponse>({
        url: '/api/students',
      })
    
      useEffect(() => {
        execute()
      }, [])


  return (
    <div className='w-full p-[20px]'>
    <div className='w-full flex items-center justify-end'>
      <CreateStudent/>
    </div>
    <StudentsTable tableData={data?.data || []} />
    {error && <p className="text-red-500 mt-4">{error}</p>}
  </div>
  )
}

export default Students