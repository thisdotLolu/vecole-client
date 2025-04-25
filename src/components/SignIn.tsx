'use client'
import { useFetch } from '@/app/hooks/useFetch';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import CustomSelect from './CustomSelect';
import { selectOptions } from './SignUp';

type FormDataType = {
  email: string;
  password: string;
};

type ErrorType = {
  email: string;
  password: string;
};

type SignInResponse = {
  access_token: string;
  token_type:'bearer'
};

export default function SigninForm() {
  const [formData, setFormData] = useState<FormDataType>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<ErrorType>({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const [role,setRole] = useState<string | undefined>()
  const { data, error, isLoading, execute } = useFetch<SignInResponse>({
    method: 'POST',
    url: '/api/login',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  useEffect(() => {
    if (data) {
      toast.success('Signed in successfully!');
      router.push('/');
      router.refresh()
    }
    
    if (error) {
      toast.error(error);
      setIsSubmitting(false);
    }
  }, [data, error]);
  console.log(role)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = window.localStorage.getItem('role');
      setRole(storedRole!);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = (): ErrorType => {
    const newErrors: ErrorType = {
      email: '',
      password: ''
    };

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
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
    setErrors({ email: '', password: '' });
    
    await execute({
      body: {
        email: formData.email,
        password: formData.password,
        role
      }
    });
    setIsSubmitting(false);

  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 w-full">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
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

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Select Role
              </label>
            <CustomSelect
            selectOptions={selectOptions}
            placeholder='Select A Role'
            value={role}
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
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-2 placeholder:text-[#08080842] focus:ring-secondary focus:border-primary`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-secondary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-opacity-80">
                  Forgot your password?
                </a>
              </div>
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
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </Button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-primary hover:text-opacity-80">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}