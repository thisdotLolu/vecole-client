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
import EditClass from './EditClasses';
import DeleteClass from './DeleteClass';
import Link from 'next/link';



export interface ClassRowData{
  name?:string;
  grade?:string;
  id?:string;
  students?:{email:string,role:string,id:string},
  teacher_id?:string
}

function ClassesTable({tableData}:{tableData:ClassRowData[]}) {
 
  return (
    <>
     <Table className='w-full p-[20px]'>
      <TableCaption>A list of Classes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Class</TableHead>
          <TableHead>Grade</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData?.map((item)=>(
           <TableRow
           key={item.id}
           >
           <TableCell className="font-medium">{item.name}</TableCell>
           <TableCell className='capitalize'>{item.grade}</TableCell>

           <TableCell 
           className='flex items-center justify-center gap-3'>
            <EditClass
            selectedClass={item}
            />
            <DeleteClass
            selectedClass={item}
            />
            <Link
            href={`classes/${item.id}`}
            >
            <Eye 
            className='cursor-pointer'
            color='#191970'
            size={20}/> 
            </Link>
            </TableCell>
         </TableRow>
        ))}
      </TableBody>
    </Table>

    </>
  )
}

export default ClassesTable