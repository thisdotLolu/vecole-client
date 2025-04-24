'use client'
import React, { FormEvent, SetStateAction, useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import CustomSelect from '../CustomSelect'
import { useFetch } from '@/app/hooks/useFetch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import clsx from 'clsx'
import { toast } from 'sonner'

interface ApiResponse {
    data:{
    email:string;
    role:'student';
    id:string
    }[]
}

function AddStudent({selectedClass}:{selectedClass:any}) {
    const [selectedOption,setSelectedOption] = useState<string | undefined>('')
    const { data:studentsData, isLoading, error:studentsError, execute:studentsExecute } = useFetch<ApiResponse>({
        url: '/api/students',
    })
    const { data:addClassData, isLoading:isAddingClass, error:addClassError, execute:addClassExecute } = useFetch<ApiResponse>({
        url: '/api/classes/' + selectedClass + '/students/' + selectedOption,
        method:'POST'
    })

useEffect(() => {
    studentsExecute()
}, [])


useEffect(() => {
    if (addClassData ) {
        console.log(addClassData)
        toast.success('Student Added')
        
    }
    
    if (addClassError) {
      toast.error(addClassError);
      console.log(addClassError)
    }
  }, [addClassData, addClassError]);

console.log(addClassData)
console.log(selectedOption)

const handleAddStudent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedOption) {
        addClassExecute()
    }
}

console.log(studentsData)
  return (
    <Dialog>
    <DialogTrigger>  
              <p
                  className='p-1 cursor-pointer px-2 rounded-md text-white bg-primary text-[.9rem]'
              >
                  + Add Student
              </p>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <form className="mt-8 space-y-6" onSubmit={handleAddStudent}>
                <DialogTitle>Add a Student to {selectedClass?.name}?</DialogTitle>
                <DialogDescription>
                    Select A student to Add
                      </DialogDescription>
                      <div>
                          <Select 
                            
                              value={selectedOption}
                              onValueChange={(value) => {
                                  setSelectedOption && setSelectedOption(value);
                              }}
                          >
                              <SelectTrigger
                              className='w-full'
                              >
                                  <SelectValue placeholder='Select' />
                              </SelectTrigger>
                              <SelectContent>
                                  {studentsData?.data.map((item) => (
                                      <SelectItem
                                          key={item.id}
                                          value={item.id}>{item.email}</SelectItem>
                                  ))}
                              </SelectContent>
                          </Select>
                    <Button
                        type="submit"
                        disabled={isAddingClass}
                        className="w-full mt-[30px] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        {isAddingClass ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className=" opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Adding...
                            </span>
                        ) : (
                            'Add'
                        )}
                    </Button>
                </div>
            </form>
        </DialogHeader>
    </DialogContent>
</Dialog>
  )
}

export default AddStudent