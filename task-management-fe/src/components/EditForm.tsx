'use client';

import { useForm, Controller } from 'react-hook-form';
import { ProjectTask, CreateTask } from '@/types/task';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface TaskFormProps {
    initialData?: ProjectTask;
    onSubmit: (data: CreateTask) => void;
    projects: { id: string; projectTitle: string }[];
    users: { id: string; username: string}[];
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<CreateTask>({
        defaultValues: {
            title: '',
            description: '',
            dueDate: '',
            projectId: '5624882a-718c-4d1b-abbe-1aa0a2ca039e', // Hardcoded Project ID
            userId: 'a89e68fe-7b43-4e2b-bd29-2edf006e8f83', // Hardcoded User ID
        },
    });

    

    // hardcode for dev only
    const users = [
        { id: 'a89e68fe-7b43-4e2b-bd29-2edf006e8f83', username: 'fufu'}
    ];

    const projects = [
        { id: '5624882a-718c-4d1b-abbe-1aa0a2ca039e', projectTitle: 'Task Management App'}
    ];

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
                <label className='block text-sm font-medium'>Assigned User</label>
                <select 
                    {...register('userId', { required: 'User is required' })}
                    className='mt-1 block w-full rounded-md border p-2'
                >
                    <option value="">Select User</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.username}</option>
                    ))}
                </select>
                {errors.userId && <p className='text-red-500 text-sm'>{errors.userId.message}</p>}
            </div>

            {/* Project Dropdown */}
            <div>
                <label className='block text-sm font-medium'>Project</label>
                <select 
                    {...register('projectId', { required: 'Project is required' })}
                    className='mt-1 block w-full rounded-md border p-2'
                >
                    <option value="">Select Project</option>
                    {projects.map(project => (
                        <option key={project.id} value={project.id}>{project.projectTitle}</option>
                    ))}
                </select>
                {errors.projectId && <p className='text-red-500 text-sm'>{errors.projectId.message}</p>}
            </div>

            {/* Submit Button */}
            <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
            >
                Edit
            </button>
        </form>
    );
}
