import { Project } from '@/types/project';
import api from '@/utils/api'; // Import the existing Axios instance

export const projectApi = {
    getProjectsByUserId: async (userId: string): Promise<Project[]> => {
        const response = await api.get<Project[]>(`/api/projects/user/${userId}`);
        return response.data;
    },
};
