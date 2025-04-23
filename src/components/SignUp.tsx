'use client'
import { useFetch } from '@/app/hooks/useFetch';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import CustomSelect from './CustomSelect';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type FormDataType = {
  email: string;
  password: string;
  confirmPassword: string;
};

type ErrorType = {
  email: string;
  password: string;
  confirmPassword: string;
};

type SignUpResponse = {
    "email": string,
    "password": string,
    "role": "admin" | "teacher" | "student"
}

export const selectOptions  = ['Admin','Teacher','Student']

export default function SignupForm() {
  const [formData, setFormData] = useState<FormDataType>({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<ErrorType>({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {data,error,isLoading,execute} = useFetch<SignUpResponse>({
    method:'POST',
    url:process.env.NEXT_PUBLIC_URL + '/api/v1/auth/register',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const [role,setRole] = useState<string | undefined>('')
  const router = useRouter();

useEffect(() => {
  if (data) {
    toast.success('Account created successfully!');
    window.localStorage.setItem('email',formData.email);
    window.localStorage.setItem('role',role!);
    router.push('/signin');
  }
  
  if (error) {
    toast.error(error);
    setIsSubmitting(false);
  }
}, [data, error, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = (): ErrorType => {
    const newErrors: ErrorType  = {
      email:'',
      password:'',
      confirmPassword:''
    };

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

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
    setErrors({ email: '', password: '', confirmPassword: '' });
  
    await execute({
      body: {
        email: formData.email,
        password: formData.password,
        role
      }
    });

    setIsSubmitting(false);
  };
  
  console.log(role)
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 w-full">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Create Account</h1>
          <p className="mt-2 text-gray-600">Sign up to get started</p>
        </div>
        
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
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-primary`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div className='w-full'>
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
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
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-2 placeholder:text-[#08080842] focus:ring-secondary focus:border-primary`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none placeholder:text-[#08080842]`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center cursor-pointer py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Sign up'
              )}
            </Button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/signin" className="font-medium text-primary hover:text-opacity-80">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
