import { ProjectTask, CreateTask } from '@/types/task';
import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const taskApi = {
    getAll: async () => {
        const response = await api.get<ProjectTask[]>('/api/tasks');
        return response.data;
    },

    create: async (task: CreateTask) => {
        const response = await api.post<ProjectTask>('/api/tasks', task);
        return response.data;
    },

    // create: async (task: CreateTask) => {
    //     try {
    //         const response = await api.post<ProjectTask>('/api/tasks', {
    //             ...task,
    //             dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null, // Ensure valid date
    //         });
    //         return response.data;
    //     } catch (error: any) {
    //         console.error('Error creating task:', error.response?.data || error.message);
    //         throw error;
    //     }
    // },

    update: async (id: string, task: Partial<ProjectTask>) => {
        const response = await api.put<ProjectTask>('/api/tasks/${id}', task);
        return response.data;
    },

    delete: async (id: string) => {
        await api.delete('/api/tasks/${id}');
    },
};