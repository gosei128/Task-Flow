"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useSession } from "next-auth/react";

export interface Task {
  _id: string;
  taskName: string;
  priority: string;
  status: string;
  dueDate: Date;
  userId: string;
}

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  refreshTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { status: sessionStatus } = useSession();

  const fetchTasks = useCallback(async () => {
    if (sessionStatus === "loading") return;
    if (sessionStatus === "unauthenticated") {
      setLoading(false);
      setTasks([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/task", {
        cache: "no-store",
      });

      if (response.status === 401) {
        setError("Your session has expired. Please log in again.");
        setTasks([]);
      } else if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.statusText}`);
      } else {
        const data = await response.json();
        setTasks(data);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [sessionStatus]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <TaskContext.Provider
      value={{ tasks, loading, error, refreshTasks: fetchTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
