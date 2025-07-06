import { FC, FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createResource, getCategories } from '../../lib/api';
import Header from '../../components/Header';
import FormInput from '../../components/FormInput';
import { useRouter } from 'next/router';

const AddResource: FC = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });
    const mutation = useMutation({
        mutationFn: createResource,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            router.push('/dashboard');
        },
        onError: (err: any) => alert(err.response?.data?.detail || 'Failed to add resource'),
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        mutation.mutate({
            category_id: Number(data.category_id),
            title: data.title as string,
            url: data.url as string,
            description: data.description as string,
        });
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-gray-900">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-gray-900">Add Resource</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-900">Category</label>
                        <select
                            name="category_id"
                            className="mt-1 p-2 w-full border rounded-md text-gray-900"
                            required
                        >
                            <option value="">Select a category</option>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <FormInput name="title" label="Title" type="text" required />
                    <FormInput name="url" label="URL" type="url" required />
                    <FormInput name="description" label="Description" type="text" />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        disabled={mutation.isPending}
                    >
                        Add Resource
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddResource;