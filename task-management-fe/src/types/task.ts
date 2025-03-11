import { StringExpressionOperatorReturningBoolean } from "mongoose";

export interface ProjectTask {
    id: string;
    title: string;
    description?: string;
    status: 'Todo' | 'InProgress' | 'Done';
    dueDate?: string;
    project: {
        id: string;
        name: string;
    };
    user: {
        id: string;
        username: string;
    };
}

export interface CreateTask {
    title: string;
    description?: string;
    dueDate?: string;
    projectId: string;
    userId: string;
}