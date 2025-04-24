'use client'
import { useFetch } from '@/app/hooks/useFetch'
import { Loader } from 'lucide-react'
import React, { useEffect } from 'react'
import AddStudent from './AddStudent'
import { useRouter } from 'next/navigation'

type ApiResponse = {
    data:{
    id: string,
    name: string,
    grade: string,
    students: [
    string
    ],
    teacher_id: string
    }
} 

function ClassView({classId}:{classId:string}) {

    const {data, error, execute, isLoading} = useFetch<ApiResponse>({
        method:'GET',
        url:'/api/classes/' + classId
    })

    const getClass =async() =>{
        await execute()
    }

    useEffect(()=>{
        getClass()        
    },[])
    

  return (
    <div className='w-full p-10'>
        {isLoading ? <Loader
        className='animate-spin mx-auto'
        />: 
        <div className='w-full'>
            <p className='text-[3rem] font-bold'>{data?.data?.name}</p>
            <p className='text-[3rem] font-bold'>{data?.data?.grade}</p>
            <p>Student IDs</p>
            <ul
            className='list-disc'
            >
            {(data?.data.students && data?.data?.students.length < 1) ? 'No Students' : data?.data?.students.map((student)=>(
                <li>{student}</li> 
            ))}
            </ul>
            <AddStudent
            selectedClass={data?.data.id}
            />
            {/* <AddStudent/> */}
        </div>
        }
    </div>
  )
}

export default ClassView