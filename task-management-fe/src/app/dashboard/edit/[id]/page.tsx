'use client';

import { useRouter, useParams } from 'next/navigation';
import { taskApi } from '@/services/api';
import EditTaskForm from '@/components/TaskForm';
import { useEffect, useState } from 'react';
import { ProjectTask, UpdateTask } from '@/types/task';
import EditTask from '@/components/EditForm';

export default function EditTaskPage() {
    const router = useRouter();
    const params = useParams();
    console.log("Params object:", params);
    const taskId = Array.isArray(params.id) ? params.id[0] : params.id;
    console.log("Task ID:", taskId);

    const [taskToEdit, setTaskToEdit] = useState<ProjectTask | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        if (!taskId) {
            setIsLoading(false);
            setError("Task ID is missing.");
            return;
        }

        const fetchTask= async () => {
            setIsLoading(true);
            setError(null);

            try {
                console.log("Fetching task id:", taskId);
                const task = await taskApi.getTask(taskId);
                console.log("Task fetched:", task);
                setTaskToEdit(task);
            } catch (err) {
                setError("Failed to fetch!");
                console.error("Error fetching task ", err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchTask();
    }, [taskId]);

    const handleEdit = async (data: UpdateTask) => {
        if (!taskId) {
            setError('Task ID is missing.');
            return;
        }
        try {
            await taskApi.updateTask(taskId, data.title, data.description, data.dueDate, data.status); // Update the task
            router.push('/dashboard');
        } catch (error) {
            console.error('Task edit failed:', error);
            setError('Task edit failed.');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!taskToEdit) {
        return <div>Task not found.</div>;
    }

    return (
        <div className='container mx-auto p-4 max-w-2xl'>
            <h2 className='text-xl font-bold mb-4'>Edit Task</h2>
            <EditTask
                initialData={taskToEdit}
                onSubmit={handleEdit}
            />
        </div>
    );
}
