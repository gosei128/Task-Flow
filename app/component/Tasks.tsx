"use client";

import { ChevronDown } from "griddy-icons";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SkeletonTask from "./SkeletonTask";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useTaskContext } from "../context/taskContext";

interface Task {
  _id: string;
  taskName: string;
  priority: string;
  status: string;
  dueDate: Date;
  userId: string;
}

interface TasksProps {
  status: string;
}

const Tasks = ({ status }: TasksProps) => {
  const [data, setData] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status: sessionStatus } = useSession();
  const { refreshTasks } = useTaskContext();

  useEffect(() => {
    const fetchTasks = async () => {
      // Wait for session to load
      if (sessionStatus === "loading") {
        return;
      }

      // Check if user is authenticated
      if (sessionStatus === "unauthenticated") {
        setError("Please log in to view your tasks");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:3000/api/task?status=${status}`,
          {
            cache: "no-store",
          },
        );

        if (response.status === 401) {
          setError("Your session has expired. Please log in again.");
          setData([]);
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch tasks: ${response.statusText}`);
        }

        await new Promise((resolve) => setTimeout(resolve, 300));
        const tasks = await response.json();
        setData(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [status, sessionStatus]);

  const handleStatusChange = async (taskId: string, currentStatus: string) => {
    let newStatus = "";
    if (currentStatus === "pending") {
      newStatus = "in-progress";
    } else if (currentStatus === "in-progress") {
      newStatus = "completed";
    } else {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/task`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId, status: newStatus }),
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((task) => task._id !== taskId));
        refreshTasks();
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/task?taskId=${taskId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        alert("Failed to delete task");
        return;
      }

      // Remove task from state
      setData((prevData) => prevData.filter((task) => task._id !== taskId));
      refreshTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("An error occurred while deleting the task");
    }
  };

  if (loading) {
    return (
      <div>
        <SkeletonTask />
      </div>
    );
  }

  if (error) {
    return (
      <main className="w-full border-0">
        <div className="text-center py-8 text-red-500">
          <p>{error}</p>
        </div>
      </main>
    );
  }

  if (data.length === 0) {
    return (
      <main className="w-full border-0">
        <div className="text-center py-8 text-gray-500">
          <p>No tasks found. Create one to get started!</p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full border-0">
      {data.map((task) => (
        <div
          key={task._id}
          className="w-full border-b-2 mb-2 border-gray-200 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center p-3 gap-3 rounded-md"
        >
          <h1 className="text-sm font-medium break-words shrink break-all sm:break-normal">
            {task.taskName}
          </h1>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0">
            {status === "pending" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStatusChange(task._id, "pending")}
              >
                Start
              </Button>
            )}
            {status === "in-progress" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStatusChange(task._id, "in-progress")}
              >
                Done
              </Button>
            )}
            <div
              className={`text-sm border shadow-xs rounded-sm px-4 py-1
              ${task.priority === "low" ? "bg-linear-to-t/increasing from-green-100  to-white border-green-200 text-green-500 " : ""}
               ${task.priority === "medium" ? "bg-linear-to-t/increasing from-blue-100  to-white border-blue-200 text-blue-500 " : ""}
               ${task.priority === "high" ? "bg-linear-to-t/increasing from-amber-100  to-white border-amber-200 text-amber-500 " : ""}
                `}
            >
              {task.priority}
            </div>
            <button
              onClick={() => handleDeleteTask(task._id)}
              className="hover:opacity-70 transition-opacity cursor-pointer"
            >
              <Trash size={20} />
            </button>
          </div>
        </div>
      ))}
    </main>
  );
};

export default Tasks;
