"use client";

import { useEffect, useState } from "react";

interface Task {
  _id: string;
  taskName: string;
  priority: string;
  status: string;
  dueDate: Date;
}

interface TasksProps {
  status: string;
}

const Tasks = ({ status }: TasksProps) => {
  const [data, setData] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/task?status=${status}`,
          {
            cache: "no-store",
          },
        );
        const tasks = await response.json();
        setData(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [status]);

  if (loading) {
    return <div className="text-gray-500">Loading tasks...</div>;
  }

  if (data.length === 0) {
    return <div className="text-gray-500">No tasks yet</div>;
  }

  return (
    <div>
      {data.map((task) => (
        <div
          key={task._id}
          className="border border-gray-400 inset-shadow-sm inset-shadow-gray-300 px-4 py-2 rounded-lg mb-2"
        >
          <h1>{task.taskName}</h1>
          <p>{task.priority}</p>
          <p>{task.status}</p>
        </div>
      ))}
    </div>
  );
};
export default Tasks;
