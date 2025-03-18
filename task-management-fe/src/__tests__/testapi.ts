import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import taskApi from '@/services/api'; // Adjust the path
import { ProjectTask } from '@/types/task'; // Adjust the path

const mockAxios = new MockAdapter(axios);

it('should fetch a task successfully', async () => {
    const taskId = '123';
    const mockTask: ProjectTask = {
        id: taskId,
        taskTitle: 'Test Task',
        description: 'Test Description',
        dueDate: '2023-12-31',
        status: 0,
        projects: [],
        users: [],
    };

    mockAxios.onGet(`/api/tasks/${taskId}`).reply(200, mockTask);

    const task = await taskApi.getTask(taskId);

    expect(task).toEqual(mockTask);
});