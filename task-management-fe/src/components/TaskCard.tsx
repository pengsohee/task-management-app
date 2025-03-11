import { ProjectTask } from "@/types/task";

interface TaskCardProps {
    task: ProjectTask;
    onDelete: (id: string) => void;
}

export default function TaskCard({ task, onDelete }: TaskCardProps) {
    return (
      <div className="border p-4 rounded-lg shadow-sm mb-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <div className="flex gap-2">
            <button className="text-blue-500 hover:text-blue-700">Edit</button>
            <button 
              onClick={() => onDelete(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
        <p className="text-gray-600 mt-2">{task.description}</p>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className={`px-2 py-1 rounded-full ${
            task.status === 'Done' ? 'bg-green-100 text-green-800' :
            task.status === 'InProgress' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {task.status}
          </span>
          {task.dueDate && (
            <span className="text-gray-500">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    );
}