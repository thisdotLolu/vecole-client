import { useState, useEffect } from 'react';
import axios, {
  AxiosRequestConfig,
  AxiosError,
  Method,
} from 'axios';
import { useRouter } from 'next/navigation';

type UseFetchOptions = {
  method?: Method;
  url: string;
  body?: any;
  params?: any;
  headers?: AxiosRequestConfig['headers'];
  immediate?: boolean;
};

type UseFetchResponse<T = any> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  execute: (overrideOptions?: Partial<UseFetchOptions>) => Promise<void>;
};


type ValidationError = {
  detail: Array<{
    loc: (string | number)[];
    msg: string;
    type: string;
  }>;
};

export const useFetch = <T = any>({
  method = 'GET',
  url,
  body,
  params,
  headers,
  immediate = false,
}: UseFetchOptions): UseFetchResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const execute = async (overrideOptions: Partial<UseFetchOptions> = {}) => {
    setIsLoading(true);
    setError(null);
    console.log(overrideOptions)

    try {
      const response = await axios.request<T>({
        method: overrideOptions.method || method,
        url: overrideOptions.url || url,
        data: overrideOptions.body ?? body,
        params: overrideOptions.params ?? params,
        headers: overrideOptions.headers ?? headers,
      });

      setData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError<ValidationError> | any;
      console.log(axiosError)

      const validationMsg =
        axiosError.response?.data?.error;

      const fallbackMsg =
        axiosError.message || 'Something went wrong';

        if (validationMsg === 'Invalid token') {
          try {
            await fetch('/api/logout', { method: 'POST' });
          } catch (logoutErr) {
            console.error('Logout failed:', logoutErr);
          }
          if (typeof window !== 'undefined') {
            window.location.href = '/signin';
          }
          return;
        }

      setError(validationMsg || fallbackMsg);
      console.log(validationMsg)
      console.log(fallbackMsg)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      void execute();
    }
  }, [immediate, url]);

  return { data, error, isLoading, execute };
};
