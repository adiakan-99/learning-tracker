import { FC, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getResources, getSummary, getUser } from '../lib/api';
import Header from '../components/Header';
import ResourceCard from '../components/ResourceCard';
import { useRouter } from 'next/router';

const Dashboard: FC = () => {
    const router = useRouter();

    const { data: user, isLoading: userLoading, error: userError } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false,
    });
    const { data: resources, isLoading: resourcesLoading } = useQuery({
        queryKey: ['resources'],
        queryFn: getResources,
    });
    const { data: summary, isLoading: summaryLoading } = useQuery({
        queryKey: ['summary'],
        queryFn: getSummary,
    });

    // useEffect(() => {
    //     if (userError) {
    //         localStorage.removeItem('access_token');
    //         localStorage.removeItem('refresh_token');
    //         router.push('/');
    //     }
    // }, [userError, router]);

    if (userLoading || resourcesLoading || summaryLoading) {
        return <div className="min-h-screen flex items-center justify-center text-gray-900">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-gray-900">Welcome, {user?.username}</h1>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Summary</h2>
                    <p className="text-gray-800">Total Resources: {summary?.total_resources}</p>
                    <p className="text-gray-800">Completed Resources: {summary?.completed_resources}</p>
                </div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Your Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {resources?.map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;