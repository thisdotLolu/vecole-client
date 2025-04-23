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
import { TeacherRowData } from './TeachersTable'
import { useFetch } from '@/app/hooks/useFetch'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CustomSelect from '../CustomSelect'
import { selectOptions } from '../SignUp'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


type ErrorType = {
    email: string;
    password:string
};

interface Teacher {
    email: string
    role: string;
    id: string
}

interface TeacherResponse {
    data: Teacher[]
}

function CreateTeacher() {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });
    const [errors, setErrors] = useState({
        email: '',
        password:''
    })
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();
    const [role, setRole] = useState<string | undefined>('')

    const { data, error, execute } = useFetch<TeacherResponse>({
        url: '/api/teachers/',
        method: 'POST'
    })

    useEffect(() => {
        if (data && typeof window !== 'undefined' ) {
            console.log(data)
            toast.success('Teacher Created')   
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
            email: '',
            password:''
        };

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }  
        
        if (!formData.password) {
      newErrors.password = 'Password is required';}

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
        setErrors({ email: '' ,password:''});

        await execute({
            body: {
                email: formData.email,
                role,
                password:formData.password
            }
        });
        setIsSubmitting(false);
    };

    return (
        <Dialog>
            <DialogTrigger>  <p
                    className='p-1 cursor-pointer px-2 rounded-md text-white bg-primary text-[.9rem]'
                    >
                        + Create Teacher
                    </p> </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Teacher</DialogTitle>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={formData?.email}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-primary`}
                                    placeholder="you@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Select Role
                                </label>
                                <CustomSelect
                                    selectOptions={selectOptions}
                                    placeholder='Select A Role'
                                    value={role}
                                    setValue={setRole}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-2 placeholder:text-[#08080842] focus:ring-secondary focus:border-primary`}
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-xs text-red-500">{errors.password}</p>
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
                                    Adding Teacher...
                                    </span>
                                ) : (
                                    'Create Teacher'
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default CreateTeacher