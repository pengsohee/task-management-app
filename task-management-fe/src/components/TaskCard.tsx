import { ProjectTask } from "@/types/task";
import { Card, Tag, Button, Space, Select, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from 'react';
import { taskApi } from '@/services/api';
import { statusMap, reverseStatusMap, statusDisplayMap } from '@/utils/status';
import { useRouter } from "next/navigation";
import Link from "next/link";
// import '@ant-design/v5-patch-for-react-19';

interface TaskCardProps {
    task: ProjectTask;
    onDelete: (id: string) => void;
    onUpdate: () => void;
}

export default function TaskCard({ task, onDelete, onUpdate }: TaskCardProps) {
  const router = useRouter();

  const validStatus = task.status in reverseStatusMap ? task.status : 0;
  const statusInfo = statusDisplayMap[validStatus];

  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<number>(validStatus);

  const handleStatusChange = async (value: number) => {
    setLoading(true);
    try {
      await taskApi.updateStatus(task.id, value);

      // Update local state and parent component
      setCurrentStatus(value);
      onUpdate();
      message.success('Status updated successfully');
    } catch (error) {
      message.error('Failed to update status');
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-4 bg-[#1e1e1e]"> {/* Background */}
      <Card
        className="shadow-lg rounded-lg"
        style={{
          backgroundColor: "#252526",   // Dark card color
          borderColor: "#3C3C3C",          // Subtle border
          color: "#E0E0E0",             // Light text
          width: "100%",
          maxWidth: "400px",
        }}
        title={<span style={{ color: "#E0E0E0" }}>{task.taskTitle}</span>} // Light title
        extra={<Select
          value={currentStatus}
          onChange={handleStatusChange}
          style={{
            width: "130px",
            backgroundColor: "#333", 
            color: "#E0E0E0",
            borderRadius: "8px",
            border: "1px solid #444",
          }}
          dropdownStyle={{
            backgroundColor: "#333", 
            borderRadius: "8px",
            border: "1px solid #444",
          }}
          loading={loading}
          variant="borderless"
          options={[
            { value: 0, label: <Tag color="orange">Todo</Tag> },
            { value: 1, label: <Tag color="blue">In Progress</Tag> },
            { value: 2, label: <Tag color="green">Done</Tag> },
          ]}
        />}
      >
        <p style={{ color: "#E0E0E0" }}><strong>Project:</strong> {task.projectTitle}</p>
        <p style={{ color: "#E0E0E0" }}><strong>Assigned to:</strong> {task.username}</p>
        <p style={{ color: "#E0E0E0" }}>
          <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <p style={{ color: "#E0E0E0" }}>
          <strong>Created At:</strong> {new Date(task.createdAt).toLocaleDateString()}
        </p>

        {/* Status Dropdown */}
        {/* <div className="mt-4 flex items-center gap-2">
          <label className="text-gray-400 text-sm">Status:</label>
          <Select
            value={currentStatus}
            onChange={handleStatusChange}
            style={{
              width: "130px",
              backgroundColor: "#333", 
              color: "#E0E0E0",
              borderRadius: "8px",
              border: "1px solid #444",
            }}
            dropdownStyle={{
              backgroundColor: "#333", 
              borderRadius: "8px",
              border: "1px solid #444",
            }}
            loading={loading}
            variant="borderless"
            options={[
              { value: 0, label: <Tag color="orange">Todo</Tag> },
              { value: 1, label: <Tag color="blue">In Progress</Tag> },
              { value: 2, label: <Tag color="green">Done</Tag> },
            ]}
          />
        </div> */}

        <Space className="mt-4">
            <Button icon={<EditOutlined />} style={{ backgroundColor: "#333", color: "#E0E0E0", borderColor: "#444" }} onClick={() => router.push(`/dashboard/edit/${task.id}`)}>
              Edit
            </Button>
          <Button icon={<DeleteOutlined />} style={{ backgroundColor: "#E57373", color: "#FFFFFF", borderColor: "#E57373" }} onClick={() => onDelete(task.id)}>
            Delete
          </Button>
        </Space>
      </Card>
    </div>
  );
}  