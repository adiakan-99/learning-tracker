import { FC, FormEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createCategory } from '../../lib/api';
import Header from '../../components/Header';
import FormInput from '../../components/FormInput';
import { useRouter } from 'next/router';

const AddCategory: FC = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const mutation = useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            setError('');
            router.push('/resources/add');
        },
        onError: (err: any) => setError(err.response?.data?.detail || 'Failed to add category'),
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        mutation.mutate({ name: data.name as string });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-gray-900">Add Category</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    <FormInput name="name" label="Category Name" type="text" required />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        disabled={mutation.isPending}
                    >
                        Add Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;