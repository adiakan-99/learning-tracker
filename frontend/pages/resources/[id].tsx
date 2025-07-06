import { FC, FormEvent, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getResource, getProgressLogs, createProgressLog } from '../../lib/api';
import Header from '../../components/Header';
import { useRouter } from 'next/router';

const ResourceDetails: FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const queryClient = useQueryClient();
    const [status, setStatus] = useState('IN_PROGRESS');
    const [notes, setNotes] = useState('');

    const { data: resource, isLoading: resourceLoading } = useQuery({
        queryKey: ['resource', id],
        queryFn: () => getResource(id as string),
        enabled: !!id,
    });
    const { data: logs, isLoading: logsLoading } = useQuery({
        queryKey: ['progress-logs', id],
        queryFn: getProgressLogs,
    });

    const mutation = useMutation({
        mutationFn: createProgressLog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['progress-logs', id] });
            setNotes('');
            setStatus('IN_PROGRESS');
        },
        onError: (err: any) => alert(err.response?.data?.detail || 'Failed to add progress log'),
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id) {
            mutation.mutate({
                resource_id: Number(id),
                status,
                notes,
            });
        }
    };

    if (resourceLoading || logsLoading) {
        return <div className="min-h-screen flex items-center justify-center text-gray-900">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-gray-900">{resource?.title}</h1>
                <p className="text-gray-800">Category: {resource?.category.name}</p>
                <p className="text-gray-800">Description: {resource?.description}</p>
                <a href={resource?.url} target="_blank" className="text-blue-600 hover:underline">
                    Visit Resource
                </a>
                <h2 className="text-xl font-semibold mt-4 mb-2 text-gray-900">Add Progress Log</h2>
                <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-900">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md text-gray-900"
                            required
                        >
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-900">Notes</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md text-gray-900"
                            rows={4}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        disabled={mutation.isPending}
                    >
                        Add Progress Log
                    </button>
                </form>
                <h2 className="text-xl font-semibold mt-4 mb-2 text-gray-900">Progress Logs</h2>
                <ul className="list-disc pl-5 text-gray-800">
                    {logs?.map((log) => (
                        <li key={log.id}>
                            {log.status} - {log.notes} (Updated: {new Date(log.updated_at).toLocaleString()})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ResourceDetails;