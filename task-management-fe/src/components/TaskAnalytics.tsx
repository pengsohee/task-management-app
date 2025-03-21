import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ProjectTask } from "@/types/task";

const TaskAnalytics = ({ tasks }: { tasks: ProjectTask[] }) => {
    // Count tasks based on status
    const tasksCount = {
        Todo: tasks.filter(task => task.status === 0).length,
        InProgress: tasks.filter(task => task.status === 1).length,
        Completed: tasks.filter(task => task.status === 2).length,
    };

    // Data for the chart
    const data = [
        { type: "Todo", value: tasksCount.Todo, color: "#fcb57e" }, // Orange
        { type: "In Progress", value: tasksCount.InProgress, color: "#0088FE" }, // Blue
        { type: "Completed", value: tasksCount.Completed, color: "#00C49F" }, // Green
    ];

    return (
        <div className="bg-[#252526] p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-300 mb-4 text-center">Task Status Overview</h2>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="type"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={70} // Donut effect
                        fill="#8884d8"
                        paddingAngle={3}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>

                    {/* Custom Tooltip with readable styling */}
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "white",
                            color: "black",
                            borderRadius: "5px",
                            padding: "5px",
                            boxShadow: "0px 2px 10px rgba(0,0,0,0.2)"
                        }}
                        itemStyle={{ color: "black" }}
                    />
                </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex justify-center space-x-4 mt-4">
                {data.map((entry, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                        <span className="text-gray-300">{entry.type}</span>
                    </div>
                ))}
            </div>

            {/* Total Tasks Count */}
            <div className="text-center text-white text-lg font-bold mt-4">
                Total Tasks: {tasks.length}
            </div>
        </div>
    );
};

export default TaskAnalytics;