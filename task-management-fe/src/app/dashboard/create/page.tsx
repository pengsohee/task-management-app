'use client';

import { useRouter } from 'next/navigation';
import { taskApi } from '@/services/api';
import TaskForm from '@/components/TaskForm';

export default function CreateTaskPage() {
    const router = useRouter();

    const handleSubmit = async (data: any) => {
        try {
            await taskApi.create(data);
            router.push('/dashboard');
        } catch (error){
            console.error('Task creation failed:', error);
        }
    };

    return (
        <div className='container mx-auto p-4 max-w-2xl'>
            <h2 className='text-xl font-bold mb-4'>Create New Task</h2>
            <TaskForm onSubmit={handleSubmit} />
        </div>
    );
}