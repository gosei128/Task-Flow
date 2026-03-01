"use client";

import { ChevronDown } from "griddy-icons";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [priorityLevel, setPriorityLevel] = useState<string>("Medium");
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
          className="w-fulll border-b-2 border-gray-200 flex justify-between items-center  p-2  rounded-md "
        >
          <h1 className="text-sm">{task.taskName}</h1>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{priorityLevel}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs">
                    Priority
                  </DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={priorityLevel}
                    onValueChange={setPriorityLevel}
                  >
                    <DropdownMenuRadioItem value="Low">
                      Low
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Medium">
                      Medium
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="High">
                      High
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Trash size={20} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default Tasks;
