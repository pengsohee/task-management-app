'use client';

import { useEffect, useState } from 'react';
import { ProjectTask } from '@/types/task';
import { taskApi } from '@/services/api';
import TaskCard from '@/components/TaskCard';
import Link from 'next/link';

export default function Dashboard() {
    const [tasks, setTasks] = useState<ProjectTask[]>([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const data = await taskApi.getAll();
            console.log('Tasks data:', data);
            setTasks(data);
        } catch (error) {
            console.error('Failed to load tasks:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await taskApi.delete(id);
            setTasks(tasks.filter(task => task.id != id));
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <div className='flex justify-between items-center mb-8'>
                <h1 className='text-2xl font-bold'>Task Manager</h1>
                <Link
                    href="/dashboard/create"
                    className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
                >
                Create New Task
                </Link>
            </div>

            <div className='space-y-4'>
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <TaskCard key={task.id} task={task} onDelete={handleDelete} />
                    ))
                ) : (
                    <p className="text-gray-500">No tasks available</p>
                )}
            </div>
        </div>
    );
}