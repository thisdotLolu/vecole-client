'use client'
import React, { useEffect } from 'react'
import TeachersTable from './TeachersTable'
import { useFetch } from '@/app/hooks/useFetch'

interface Teacher {
  email: string
  role: string;
  id:string
}

interface TeacherResponse {
  data: Teacher[]
}

function Teachers() {
  const { data, error, execute } = useFetch<TeacherResponse>({
    url: '/api/teachers',
  })

  useEffect(() => {
    execute()
  }, [])


  return (
    <div className='w-full p-[20px]'>
      <TeachersTable tableData={data?.data || []} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  )
}

export default Teachers
