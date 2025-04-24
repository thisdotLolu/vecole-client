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
import { Edit } from 'lucide-react'
import { useFetch } from '@/app/hooks/useFetch'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CustomSelect from '../CustomSelect'
import { selectOptions } from '../SignUp'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ClassRowData } from './ClassesTable'


type ErrorType = {
    name: string;
    grade:string
};

interface Class {
    name?:string;
    grade?:string;
    id?:string;
    students?:{name:string,role:string,id:string},
    teacher_id?:string
}

interface ClassResponse {
    data: Class[]
}

function EditClass({ selectedClass}: { selectedClass: ClassRowData | null}) {
    const [formData, setFormData] = useState({
        name: selectedClass?.name,
        grade:selectedClass?.grade
    });
    const [errors, setErrors] = useState({
        name:'',
        grade:''
    })
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();

    const { data, error, execute } = useFetch<ClassResponse>({
        url: '/api/classes/' + selectedClass?.id,
        method: 'PUT'
    })

    useEffect(() => {
        if (data && typeof window !== 'undefined' ) {
            console.log(data)
            toast.success('Changes successfully made')    
        }
        
        if (error) {
          toast.error(error);
          console.log(error)
          setIsSubmitting(false);
        }
      }, [data, error, router]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = (): ErrorType => {
        const newErrors= {
            name: '',
            grade:''
        };

        if (!formData.name) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.grade) {
      newErrors.grade = 'Grade is required';}

        return newErrors;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();

        const hasErrors = Object.values(validationErrors).some(err => err !== '');
        if (hasErrors) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        setErrors({ name: '' ,grade:''});

        await execute({
            body: {
               name:formData.name,
               grade:formData.grade
            }
        });
        setIsSubmitting(false);
    };

    return (
        <Dialog>
            <DialogTrigger> <Edit
                className='cursor-pointer'
                color='#191970'
                size={18} /> </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit {selectedClass?.name}?</DialogTitle>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="name"
                                    autoComplete="name"
                                    value={formData?.name}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-primary`}
                                    placeholder="you@example.com"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                                )}
                            </div>


                            <div>
                                <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                                    Grade
                                </label>
                                <Input
                                    id="grade"
                                    name="grade"
                                    type="grade"
                                    autoComplete="current-grade"
                                    value={formData.grade}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${errors.grade ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-2 placeholder:text-[#08080842] focus:ring-secondary focus:border-primary`}
                                    placeholder="Grade"
                                />
                                {errors.grade && (
                                    <p className="mt-1 text-xs text-red-500">{errors.grade}</p>
                                )}
                            </div>

                        </div>

                        <div>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving Changes...
                                    </span>
                                ) : (
                                    'Save Changes'
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default EditClass