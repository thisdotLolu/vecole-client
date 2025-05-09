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
import EditStudent from './EditStudent';
import DeleteStudent from './DeleteStudent';


export interface StudentRowData{
  email:string;
  role:string;
  id:string
}

function StudentsTable({tableData}:{tableData:StudentRowData[]}) {
 
  return (
    <>
     <Table className='w-full p-[20px]'>
      <TableCaption>A list of Students.</TableCaption>
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
            <EditStudent
            selectedStudent={item}
            />
            <DeleteStudent
            selectedStudent={item}
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

export default StudentsTable