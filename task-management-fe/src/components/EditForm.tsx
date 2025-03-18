'use client';

import { useForm, Controller } from 'react-hook-form';
import { ProjectTask, UpdateTask } from '@/types/task';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface EditTaskFormProps {
    initialData: ProjectTask; // Initial data for the task to be edited
    onSubmit: (data: UpdateTask) => void; // Function to handle form submission
}

export default function EditTask({ initialData, onSubmit }: EditTaskFormProps) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<UpdateTask>({
        defaultValues: {
            title: initialData.taskTitle,
            description: initialData.description,
            dueDate: initialData.dueDate,
            status: initialData.status,
            projectId: '5624882a-718c-4d1b-abbe-1aa0a2ca039e',
            userId: 'a89e68fe-7b43-4e2b-bd29-2edf006e8f83',
        },
    });

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
            {/* <div>
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
            </div> */}

            {/* Project Dropdown */}
            {/* <div>
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
            </div> */}

            {/* Submit Button */}
            <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
            >
                Update Task
            </button>
        </form>
    );
}