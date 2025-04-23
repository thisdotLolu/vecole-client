'use client'
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Edit, Trash } from 'lucide-react'
import { useFetch } from '@/app/hooks/useFetch'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CustomSelect from '../CustomSelect'
import { selectOptions } from '../SignUp'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { StudentRowData } from './StudentsTable'


type ErrorType = {
    email: string;
    password:string
};

interface Student {
    email: string
    role: string;
    id: string
}

interface StudentResponse {
    data: Student[]
}

function DeleteStudent({ selectedStudent}: { selectedStudent: StudentRowData | null}) {


    const { data, error, execute,isLoading } = useFetch<StudentResponse>({
        url: '/api/students/' + selectedStudent?.id,
        method: 'DELETE'
    })

    useEffect(() => {
        if (data && typeof window !== 'undefined' ) {
            console.log(data)
            toast.success('Deleted')
        }
        
        if (error) {
          toast.error(error);
          console.log(error)
        }
      }, [data, error]);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await execute();
    };

    return (
        <Dialog>
            <DialogTrigger>  <Trash 
            className='cursor-pointer'
            color='red'
            size={18}/>  </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete {selectedStudent?.email}?</DialogTitle>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the account
                            and remove the data from our servers.
                        </DialogDescription>
                        <div>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Deleting...
                                    </span>
                                ) : (
                                    'Delete'
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default DeleteStudent