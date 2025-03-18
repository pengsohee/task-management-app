'use client';

import { useRouter } from 'next/navigation';
import { taskApi } from '@/services/api';
import TaskForm from '@/components/TaskForm';
import { useEffect, useState } from 'react';
import { getToken, removeToken } from '@/services/auth';
import { message, Spin } from 'antd';

export default function CreateTaskPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<{ username: string } | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = getToken();
            
            if(!token){
                router.push('/login');
                return;
            }

            try {
                // Verify Token
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error('Authentication failed!');

                const user = await response.json();
                setUserData(user);
            } catch (error) {
                console.error('Auth check failed:', error);
                message.error('Session expired. Please login again');
                removeToken();
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router])

    const handleSubmit = async (data: any) => {
        try {
            await taskApi.create(data);
            message.success('Task created successfully!');
            router.push('/dashboard');
        } catch (error){
            console.error('Task creation failed:', error);
            message.error('Failed to create task');
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto p-4 max-w-2xl flex items-center justify-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className='container mx-auto p-4 max-w-2xl'>
            <h2 className='text-xl font-bold mb-4'>Create New Task</h2>
            <TaskForm onSubmit={handleSubmit} projects={[]} users={[]} />
        </div>
    );
}