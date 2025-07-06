import { FC } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markComplete } from '../lib/api';
import Link from 'next/link';

interface ResourceCardProps {
    resource: {
        id: number;
        title: string;
        url: string;
        description: string;
        category: { name: string };
        completed: boolean;
    };
}

const ResourceCard: FC<ResourceCardProps> = ({ resource }) => {
    const queryClient = useQueryClient();
    const markCompleteMutation = useMutation({
        mutationFn: () => markComplete(resource.id.toString()),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['resources'] }),
        onError: (err: any) => alert(err.response?.data?.detail || 'Failed to mark complete'),
    });

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
            <p className="text-sm text-gray-800">Category: {resource.category.name}</p>
            <p className="text-sm text-gray-800">{resource.description}</p>
            <div className="mt-2 space-x-2">
                <a href={resource.url} target="_blank" className="text-blue-600 hover:underline">
                    Visit Resource
                </a>
                <Link href={`/resources/${resource.id}`} className="text-blue-600 hover:underline">
                    View Details
                </Link>
            </div>
            {resource.completed ? (
                <p className="mt-2 text-green-600 font-semibold">Completed</p>
            ) : (
                <button
                    onClick={() => markCompleteMutation.mutate()}
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    disabled={markCompleteMutation.isPending}
                >
                    Mark Complete
                </button>
            )}
        </div>
    );
};

export default ResourceCard;