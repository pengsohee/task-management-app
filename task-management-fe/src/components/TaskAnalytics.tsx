import React from 'react';
import { Pie } from '@ant-design/plots';
import { ProjectTask } from '@/types/task';

const taskAnalytics = ({tasks }: { tasks: ProjectTask[] }) => {
    // count based on status
    const tasksCount = {
        Todo: tasks.filter(task => task.status === 0).length,
        InProgress: tasks.filter(task => task.status === 1).length,
        Completed: tasks.filter(task => task.status === 2).length,
    };

    // data for pie chart
    const data = [
        { type: 'Todo', value: tasksCount.Todo},
        { type: 'InProgress', value: tasksCount.InProgress},
        { type: 'Completed', value: tasksCount.Completed},
    ];

    // chart config
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        scale: { 
            color: { 
              range: ['#fcb57e', '#0088FE', '#00C49F'] 
            } 
          },
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ value }: { value: number }) => `${value}`,
            style: { fontSize: 14, textAlign: 'center' },
        },
        legend: {
            itemName: {
                style: { fill: '#E0E0E0'},
            },
        },
        interactions: [{ type: 'element-active' }],
    };

    return (
        <div className="bg-[1e1e1e] p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-300 mb-2">Task Status Overview</h2>
            <Pie{...config} />
        </div>
    );
};

export default taskAnalytics