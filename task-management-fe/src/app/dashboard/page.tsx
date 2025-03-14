'use client';

import { useEffect, useState } from 'react';
import { ProjectTask } from '@/types/task';
import { taskApi } from '@/services/api';
import TaskCard from '@/components/TaskCard';
import Link from 'next/link';
import TaskAnalytics from '@/components/TaskAnalytics';
import { Row, Col, Card } from 'antd';

export default function Dashboard() {
    const [tasks, setTasks] = useState<ProjectTask[]>([]);

    const loadTasks = async () => {
        try {
            const data = await taskApi.getAll();

            const sortedTasks = data.sort((a: ProjectTask, b: ProjectTask) => a.status - b.status);

            console.log('Sorted Task:', data);
            setTasks(data);
        } catch (error) {
            console.error('Failed to load tasks:', error);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);
    

    const handleDelete = async (id: string) => {
        try {
            await taskApi.delete(id);
            setTasks(tasks.filter(task => task.id != id));
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const handleUpdate = (updatedTask: ProjectTask) => {
        setTasks(prevTasks => prevTasks.map(task => 
          task.id === updatedTask.id ? updatedTask : task
        ));
      };

    return (
        <div className="p-6 bg-[#121212] min-h-screen">
            <div className="flex flex-col items-center">
                <div className='flex justify-between items-center mb-8 w-[400px] '>
                    <h1 className='text-2xl font-bold'>TODO LIST</h1>
                    <Link
                        href="/dashboard/create"
                        className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
                    >
                    Create New Task
                    </Link>
                </div>
            </div>
            
            <Row gutter={20}>
                {/* Left Column: Pie Chart */}
                <Col span={9}>
                    <Card className="bg-[#1e1e1e] rounded-lg shadow-lg">
                        <TaskAnalytics tasks={tasks} />
                    </Card>
                </Col>

                {/* Middle Column: Task List */}
                <Col span={6}>
                    <div className="space-y-4">
                        {tasks.length > 0 ? (
                            tasks.map(task => (
                                <TaskCard key={task.id} task={task} onDelete={handleDelete} onUpdate={loadTasks} />
                            ))
                        ) : (
                            <p style={{ color: "#E0E0E0" }}>No tasks available</p>
                        )}
                    </div>
                </Col>

                {/* Right Column: Empty or Additional Widgets */}
                <Col span={9}>
                    <Card className="bg-[#1e1e1e] rounded-lg shadow-lg">
                        <h2 className="text-[#E0E0E0] text-lg">Additional Widgets</h2>
                        <p className="text-gray-400">You can add filters, stats, or another chart here.</p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
    //     <div className='container mx-auto p-4 min-h-screen bg-[#1e1e1e] text-[#E0E0E0]"'>
    //         <div className="flex flex-col items-center">
    //             <div className='flex justify-between items-center mb-8 w-[400px] '>
    //                 <h1 className='text-2xl font-bold'>TODO LIST</h1>
    //                 <Link
    //                     href="/dashboard/create"
    //                     className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
    //                 >
    //                 Create New Task
    //                 </Link>
    //             </div>

    // //             {/* Pie Chart for Task Status */}
    // //             <TaskAnalytics tasks={tasks} />
        
    // //             <div className='space-y-4 w-full'>
    // //                 {tasks.length > 0 ? (
    //                     tasks.map(task => (
    //                         <TaskCard key={task.id} task={task} onDelete={handleDelete} onUpdate={loadTasks}/>
    //                     ))
    //                 ) : (
    //                     <p className="text-gray-500">No tasks available</p>
    //                 )}
    //             </div>
    //         </div>
    //     </div>
    // );
}