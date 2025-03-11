'use client';

import { useForm } from 'react-hook-form';
import { ProjectTask, CreateTask } from '@/types/task';

interface TaskFormProps {
    initialData?: ProjectTask;
    onSubmit: (data: CreateTask | ProjectTask) => void;
}

export default function TaskForm({ initialData, onSubmit }: TaskFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData || {},
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className='block text-sm font-medium'>Title</label>
                <input
                    {...register('title', { required: 'Title is required' })}
                    className='mt-1 block w-full rounded-md border p-2'
                />
                {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}
            </div>
            
            <div>
                <label className='block text-sm font-medium'>Description</label>
                <textarea 
                    {...register('description')}
                    className='mt-1 block w-full rounded-md border p-2'
                />
            </div>

            <div>
                <label className='block text-sm font-medium'>Status</label>
                <select 
                    {...register('status')}
                    className='mt-1 block w-full rounded-md border p-2'
                >
                    <option value="Todo">Todo</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Done">Done</option>
                </select>
            </div>

            <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
            >
                {initialData ? 'Update Task' : 'Create Task'}
            </button>
        </form>
    );
}