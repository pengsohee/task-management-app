import { TaskStatus } from "./status";

export interface ProjectTask {
    id: string;
    taskTitle: string;
    projectTitle: string;
    username: string;
    description?: string;
    status: number;
    dueDate: string;
    createdAt: string;
    project: {
        id: string;
        name: string;
    };
    user: {
        id: string;
        username: string;
    };
}

export interface UpdateTask {
    title: string;
    description: string;
    dueDate: string;
    status: number;
    projectId: string;
    userId: string;
}

export interface CreateTask {
    title: string;
    description?: string;
    dueDate?: string;
    projectId: string;
    userId: string;
}