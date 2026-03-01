"use client";

import { ChevronDown } from "griddy-icons";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SkeletonTask from "./SkeletonTask";
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
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
    return (
      <div>
        <SkeletonTask />
      </div>
    );
  }
  return (
    <div className="">
      {data.map((task) => (
        <div
          key={task._id}
          className="w-fulll border-b-2 mb-2 border-gray-200 flex justify-between items-center  p-2  rounded-md "
        >
          <h1 className="text-sm">{task.taskName}</h1>

          <div className="flex items-center gap-3">
            <div
              className={`text-sm border shadow-xs rounded-sm px-4 py-1
              ${task.priority === "low" ? "bg-linear-to-t/increasing from-green-100  to-white border-green-200 text-green-500 " : ""}
               ${task.priority === "medium" ? "bg-linear-to-t/increasing from-blue-100  to-white border-blue-200 text-blue-500 " : ""}
               ${task.priority === "high" ? "bg-linear-to-t/increasing from-amber-100  to-white border-amber-200 text-amber-500 " : ""}
                `}
            >
              {task.priority}
            </div>
            <Trash size={20} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default Tasks;
