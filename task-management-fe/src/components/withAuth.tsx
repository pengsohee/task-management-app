// components/withAuth.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';
import { getToken, removeToken } from '@/services/auth';

export default function withAuth(WrappedComponent: React.ComponentType) {
    return function AuthenticatedComponent() {
        const router = useRouter();
        const [loading, setLoading] = useState(true);
        const [userData, setUserData] = useState<{ username: string } | null>(null);

        useEffect(() => {
            const checkAuth = async () => {
                const token = getToken();
                if (!token) {
                    router.push('/login');
                    return;
                }

                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    
                    if (!response.ok) throw new Error('Authentication failed');
                    
                    const user = await response.json();
                    setUserData(user);
                } catch (error) {
                    console.error('Auth check failed:', error);
                    removeToken();
                    router.push('/login');
                } finally {
                    setLoading(false);
                }
            };

            checkAuth();
        }, [router]);

        if (loading) {
            return (
                <div className="container mx-auto p-4 max-w-2xl flex items-center justify-center h-screen">
                    <Spin size="large" />
                </div>
            );
        }

        return <WrappedComponent />;
    };
}