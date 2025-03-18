import { ProjectTask, CreateTask, UpdateTask } from '@/types/task';
import axios from 'axios';
import { getToken } from './auth';
import { Project } from '@/types/project';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Req interceptors to include token
api.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const taskApi = {
    // getAll
    getAll: async (): Promise<ProjectTask[]> => {
        const response = await api.get<ProjectTask[]>('/api/tasks');
        return response.data;
    },

    // getTask
    getTask: async (id: string): Promise<ProjectTask> => {
        const response = await api.get<ProjectTask>(`/api/tasks/${id}`);
        return response.data;
    },

    create: async (task: CreateTask) => {
        const formattedTask = {
            title: task.title,  // Convert taskTitle -> title
            description: task.description,  
            dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : undefined,  
            projectId: task.projectId,  
            userId: task.userId
        };

        const response = await api.post<CreateTask>('/api/tasks', formattedTask);
        return response.data;
    },

    updateTask: async (id: string, title:string, description: string, dueDate: string, status: number) => {
        const response = await api.patch<ProjectTask>(`/api/tasks/${id}`, {
            title,
            description,
            dueDate,
            status: 0,
            // userId: "a89e68fe-7b43-4e2b-bd29-2edf006e8f83",
            // projectId: "5624882a-718c-4d1b-abbe-1aa0a2ca039e"
        });
        return response.data;
    },

    updateStatus: async (id: string, status: number) => {
        const response = await api.patch<ProjectTask>(`/api/tasks/${id}/status`, {
            status,
            userId:"a89e68fe-7b43-4e2b-bd29-2edf006e8f83",
            projectId:"5624882a-718c-4d1b-abbe-1aa0a2ca039e"
        });
        return response.data;
    },


    delete: async (id: string) => {
        await api.delete(`/api/tasks/${id}`);
    },
};