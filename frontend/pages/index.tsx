import { FC, FormEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signup, login } from '../lib/api';
import FormInput from '../components/FormInput';
import { useRouter } from 'next/router';

const Home: FC = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      setIsSignup(false);
      setError('');
    },
    onError: (err: any) => setError(err.response?.data?.detail || 'Signup failed'),
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => router.push('/dashboard'),
    onError: (err: any) => setError(err.response?.data?.detail || 'Login failed'),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (isSignup) {
      if (data.password !== data.re_password) {
        setError('Passwords do not match');
        return;
      }
      signupMutation.mutate({
        username: data.username as string,
        email: data.email as string,
        password: data.password as string,
        re_password: data.re_password as string,
      });
    } else {
      loginMutation.mutate({
        username: data.username as string,
        password: data.password as string,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
          {isSignup ? 'Sign Up' : 'Login'}
        </h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <FormInput name="username" label="Username" type="text" required />
          {isSignup && <FormInput name="email" label="Email" type="email" required />}
          <FormInput name="password" label="Password" type="password" required />
          {isSignup && (
            <FormInput name="re_password" label="Confirm Password" type="password" required />
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            disabled={signupMutation.isPending || loginMutation.isPending}
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-900">
          {isSignup ? 'Already have an account?' : 'Need an account?'}
          <button
            className="ml-1 text-blue-600 hover:underline"
            onClick={() => {
              setIsSignup(!isSignup);
              setError('');
            }}
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Home;