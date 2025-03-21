'use client';

import { useEffect, useState } from 'react';
import { ProjectTask } from '@/types/task';
import { taskApi } from '@/services/api';
import TaskCard from '@/components/TaskCard';
import "@/styles/scrollbar.css"
import "@/styles/darkbutton.css"
import TaskAnalytics from '@/components/TaskAnalytics';
import { Row, Col, Card, Button, Avatar, message, Spin, Tag } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import { getToken, removeToken } from '@/services/auth';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [tasks, setTasks] = useState<ProjectTask[]>([]);
    const [userData, setUserData] = useState<{ id: string, username: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const checkAuth = async () => {
        const token = getToken();
        if(!token) {
            router.push('/login');
            return;
        }

        try {
            // Fetch user data
            const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!userResponse.ok)
                throw new Error('Auth failed');
            
            const user = await userResponse.json();
            setUserData(user);
            console.log('User ID:', user.id);

            // Fetch tasks
            const tasksResponse = await taskApi.getAll();
            const sortedTasks = tasksResponse.sort((a: ProjectTask, b: ProjectTask) => a.status - b.status);
            setTasks(sortedTasks);
        } catch (error) {
            console.error('Failed to load data: ', error);
            message.error('Session expired. PLease login again');
            removeToken();
            router.push('/login');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const token = getToken();

            if(!token)
                return

            await taskApi.delete(id);
            setTasks(tasks.filter(task => task.id != id));
            message.success('Task deleted successfully');
        } catch (error) {
            console.error('Failed to delete task:', error);
            message.error('Failed to delete task');
        }
    };

    const handleLogout = () => {
        removeToken();
        router.push('/login');
    };
    
    const handleUpdate = (updatedTask: ProjectTask) => {
        setTasks(prevTasks => prevTasks.map(task => 
          task.id === updatedTask.id ? updatedTask : task
        ));
      };

    if (loading) {
        return (
            <div className="p-4 bg-[#121212] min-h-screen flex items-center justify-center">
                <Spin size="large" className="text-white" />
            </div>
        );
    }    

    const handleEditProfile = async () => {
        if (userData && userData.id) {
            router.push(`/profile/edit/${userData.id}`);
        } else {
            console.error('User data is not available');
        }
    };

    return (
        <div className="p-4 bg-[#121212] min-h-screen">
            <Row gutter={[20, 20]} className="mb-4">
                <Col xs={24} md={8} lg={7}>
                    <div className="flex flex-col gap-4 h-screen">
                            <Card
                                className="dashboard-header-card w-full"
                                style={{
                                    backgroundColor: "#1E1E1E",
                                    borderColor: "#3c3c3c",
                                    borderRadius: 12,
                                    height: "80px"
                                }}
                                styles={{
                                    body: { 
                                    padding: "16px",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    }
                                }}
                            >
                                <div className="flex items-center gap-4 flex-grow">
                                    <Avatar 
                                        size={48} 
                                        icon={<UserOutlined />} 
                                        style={{ backgroundColor: '#1890ff' }}
                                    />
                                    <div>
                                        <p className="text-neutral-300 text-sm">Welcome back</p>
                                        <h2 className="text-white text-lg font-semibold m-0">
                                            {userData?.username || 'User'}
                                        </h2>
                                    </div>
                                </div>

                                <div className='flex w-18 justify-between'>
                                    <Button 
                                    shape="circle" 
                                    icon={<SettingOutlined />} 
                                    onClick={handleEditProfile}
                                    className="dark-avatar-button"
                                    type="text"
                                    style={{ color: '#e0e0e0' }}
                                    />

                                    <Button 
                                    shape="circle" 
                                    icon={<LogoutOutlined />} 
                                    onClick={handleLogout}
                                    className="dark-avatar-button"
                                    type="text"
                                    style={{ color: '#e0e0e0' }}
                                    />
                                </div>
                                
                            </Card>
                            {/* Task analytics card */}
                            <Card
                                className="analytics-card flex-1 overflow-hidden"
                                style={{
                                    backgroundColor: "#1E1E1E",
                                    borderColor: "#3c3c3c",
                                    borderRadius: 12,
                                }}
                            >
                                <div className="flex flex-col h-full">
                                    <h3 className="text-white text-lg font-semibold mb-4">Task Analytics</h3>
                                    <TaskAnalytics tasks={tasks} />

                                    {/* Recent Completed Tasks Section */}
                                <div className="mt-6 flex-1 overflow-y-auto">
                                    <h4 className="sticky top-0 bg-[#1e1e1e] text-white text-lg font-semibold mb-2">Recently Completed Tasks</h4>
                                        <ul className="text-gray-300 space-y-2">
                                            {tasks
                                                .filter(task => task.status === 2) // Filter completed tasks
                                                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Most recent first
                                                .slice(0, 5) // Top 5 tasks
                                                .map(task => (
                                                    <li key={task.id} className="border-b border-gray-600 py-2">
                                                        <span className="font-semibold">{task.taskTitle}</span>
                                                        <span className="text-sm text-gray-400 ml-2">
                                                            {new Date(task.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                </div>
                                </div>
                            </Card>
                    </div>
                </Col>

                <Col xs={24} md={16} lg={17}>
                    <Card
                        className="main-content-card"
                        style={{
                            backgroundColor: "#1E1E1E",
                            borderColor: "#3c3c3c",
                            borderRadius: 12,
                            height: '100vh'
                        }}
                        styles={{
                            body: { 
                            padding: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%'
                            }
                        }}
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between p-6 border-b border-[#3c3c3c]">
                                <div>
                                    <h1 className="text-white text-2xl font-bold m-0">Todo List</h1>
                                    <Tag color="#1890ff" className="mt-2">
                                        {tasks.length} tasks total
                                    </Tag>
                                </div>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    href="/dashboard/create"
                                    disabled={!userData}
                                    className="flex items-center"
                                    size="large"
                                >
                                    New Task
                                </Button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6">
                                <div className="grid gap-4">
                                    {tasks.length > 0 ? (
                                        tasks.map(task => (
                                            <TaskCard
                                                key={task.id}
                                                task={task}
                                                onDelete={handleDelete}
                                                onUpdate={checkAuth}
                                            />
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-64">
                                            <p className="text-neutral-400 text-lg mb-4">
                                                No tasks found
                                            </p>
                                            <Button
                                                type="primary"
                                                ghost
                                                href="/dashboard/create"
                                            >
                                                Create Your First Task
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}