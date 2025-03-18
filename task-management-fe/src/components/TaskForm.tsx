'use client';

import { useForm, Controller } from 'react-hook-form';
import { ProjectTask, CreateTask } from '@/types/task';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { jwtDecode } from 'jwt-decode'; 
import { useEffect, useState } from 'react';
import { getToken } from '@/services/auth';
import api from '@/utils/api';
import { projectApi } from '@/services/projectApi';

interface TaskFormProps {
    initialData?: ProjectTask;
    onSubmit: (data: CreateTask) => void;
    projects: { id: string; projectTitle: string }[];
    users: { id: string; username: string}[];
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
    const [userId, setUserId] = useState<string | null>(null);
    const [projects, setProjects] = useState<{ id: string; projectTitle: string }[]>([]);

    useEffect(() => {
        // Retrieve JWT token from localStorage or sessionStorage
        const token = getToken();
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                console.log("Decoded Token:", decoded);
                setUserId(decoded.userId); 
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }, []);

    useEffect(() => {
        if (userId) {
            console.log("Fetching projects for User ID:", userId);
            projectApi.getProjectsByUserId(userId)
                .then(data => {
                    const formattedProjects = data.map(project => ({
                        ...project,
                        projectTitle: project.title,
                    }));
                    setProjects(formattedProjects);
                })
                .catch(error => console.error('Error fetching projects:', error));
        }
    }, [userId]);
    
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<CreateTask>({
        defaultValues: {
            title: '',
            description: '',
            dueDate: '',
            projectId: '', 
            userId: '', 
        },
    });

    // Set userId when it's available
    useEffect(() => {
        if (userId) {
            setValue('userId', userId);
        }
    }, [userId, setValue]);


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Task Title */}
            <div>
                <label className='block text-sm font-medium'>Task Title</label>
                <input
                    {...register('title', { required: 'Task Title is required' })}
                    className='mt-1 block w-full rounded-md border p-2'
                />
                {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}
            </div>

            {/* Task Description */}
            <div>
                <label className='block text-sm font-medium'>Task Description</label>
                <textarea 
                    {...register('description', { required: 'Task Description is required' })}
                    className='mt-1 block w-full rounded-md border p-2'
                />
                {errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
            </div>

            {/* Due Date */}
            <div>
                <label className="block text-sm font-medium">Due Date</label>
                <Controller
                    control={control} 
                    name="dueDate"
                    rules={{ required: "Due date is required" }}
                    render={({ field }) => (
                        <DatePicker
                            selected={field.value ? new Date(field.value) : null}
                            onChange={(date) => field.onChange(date?.toISOString())}
                            className="mt-1 block w-full rounded-md border p-2"
                            dateFormat="yyyy-MM-dd"
                        />
                    )}
                />
                {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
            </div>

            {/* User Dropdown */}
            <div>
                <label className="block text-sm font-medium">Assigned User</label>
                <input
                    type="text"
                    value={userId || 'Fetching user...'}
                    readOnly
                    className="mt-1 block w-full rounded-md border p-2 cursor-not-allowed"
                />
                <input type="hidden" {...register('userId', { required: 'User is required' })} />
                {errors.userId && <p className="text-red-500 text-sm">{errors.userId.message}</p>}
            </div>

            {/* Project Dropdown */}
            <div>
                <label className="block text-sm font-medium">Project</label>
                <select
                    {...register('projectId', { required: 'Project is required' })}
                    className="mt-1 block w-full rounded-md border p-2"
                >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>{project.projectTitle}</option>
                    ))}
                </select>
                {errors.projectId && <p className="text-red-500 text-sm">{errors.projectId.message}</p>}
            </div>

            {/* Submit Button */}
            <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
            >
                Create Task
            </button>
        </form>
    );
}
