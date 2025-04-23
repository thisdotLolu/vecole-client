'use client'
import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Delete, Edit, Eye, Trash } from 'lucide-react';
import EditTeacher from './EditTeacher';
import DeleteTeacher from './DeleteTeacher';


export interface TeacherRowData{
  email:string;
  role:string;
  id:string
}

function TeachersTable({tableData}:{tableData:TeacherRowData[]}) {
  const [openModal,setOpenModal] = useState({
    edit:false,
    delete:false,
})
// const [selectedTeacher,setSelectedTeacher]= useState<TeacherRowData | null>(null)
  return (
    <>
     <Table className='w-full p-[20px]'>
      <TableCaption>A list of Teachers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData?.map((item)=>(
           <TableRow
           key={item.id}
           >
           <TableCell className="font-medium">{item.email}</TableCell>
           <TableCell className='capitalize'>{item.role}</TableCell>

           <TableCell 
           className='flex items-center justify-center gap-3'>
            <EditTeacher
             selectedTeacher={item}
            />
            <DeleteTeacher
            selectedTeacher={item}
            />
            <Eye 
            className='cursor-pointer'
            color='#191970'
            size={20}/> </TableCell>
         </TableRow>
        ))}
      </TableBody>
    </Table>

    </>
  )
}

export default TeachersTable