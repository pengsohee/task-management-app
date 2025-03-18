import React from "react";
import { Pie } from "@ant-design/plots";
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
        { type: "InProgress", value: tasksCount.InProgress, color: "#0088FE" }, // Blue
        { type: "Completed", value: tasksCount.Completed, color: "#00C49F" }, // Green
        { type: "Todo", value: tasksCount.Todo, color: "#fcb57e" }, // Orange
    ];

    // Define color mapping function
    const colorMapping: { [key: string]: string } = {
        Todo: "#fcb57e",       // Orange
        InProgress: "#0088FE", // Blue
        Completed: "#00C49F",  // Green
    };

    // Chart config
    const config = {
        appendPadding: 20,
        data,
        angleField: "value",
        colorField: "type",
        radius: 0.85,  // Donut chart with an inner circle
        innerRadius: 0.6,
        color: ({ type }: { type: string }) => colorMapping[type],
        label: {
            type: "spider", // Places labels outside for better readability
            content: ({ type, value, percent }: { type: string; value: number; percent: number }) => 
                `${type}: ${value} (${(percent * 100).toFixed(1)}%)`,
            style: { fontSize: 14, fill: "#E0E0E0" },
        },
        statistic: {
            title: {
                offsetY: -5,
                style: { fontSize: "16px", fill: "#E0E0E0" },
                content: "Total Tasks",
            },
            content: {
                offsetY: 5,
                style: { fontSize: "24px", fontWeight: "bold", fill: "#ffffff" },
                content: `${tasks.length}`,
            },
        },
        legend: {
            position: "bottom",
            itemName: {
                style: {
                    fill: "#ffffff", // ✅ Always white text
                    fontSize: 14,
                    fontWeight: "bold",
                },
            },
            itemValue: {
                style: {
                    fill: "#ffffff", // ✅ Ensures numbers stay visible
                    fontSize: 14,
                },
            },
            marker: {
                symbol: "circle", // ✅ Makes legend markers round
                style: { r: 8 },
            },
        },
        interactions: [
            { type: "element-active" },
            { type: "legend-highlight" }
        ],
        state: {
            inactive: {
                style: {
                    opacity: 0.5, // ✅ Chart fades slightly, but legend text stays visible
                },
            },
        },
    };

    return (
        <div className="bg-[#252526] p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-300 mb-2">Task Status Overview</h2>
            <Pie {...config} />
        </div>
    );
};

export default TaskAnalytics;
