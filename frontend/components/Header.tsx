import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header: FC = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        router.push('/');
    };

    return (
        <nav className="bg-blue-500 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/dashboard" className="text-xl font-bold">
                    Learning Tracker
                </Link>
                <div className="space-x-4">
                    <Link href="/dashboard" className="hover:underline">
                        Dashboard
                    </Link>
                    <Link href="/categories/add" className="hover:underline">
                        Add Category
                    </Link>
                    <Link href="/resources/add" className="hover:underline">
                        Add Resource
                    </Link>
                    <button onClick={handleLogout} className="hover:underline">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Header;