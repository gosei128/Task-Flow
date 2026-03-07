"use client";
import { useTaskContext } from "../context/taskContext";
import { ClipboardList, Check, Time, AlertCircle } from "griddy-icons";
import { useEffect } from "react";
const Dashboard = () => {
  const { tasks } = useTaskContext();
  console.log(tasks);

  const totalTasks = tasks.length;
  const pendings = tasks.filter((task) => task.status === "pending").length;
  const inProgress = tasks.filter(
    (task) => task.status === "in-progress",
  ).length;
  const completed = tasks.filter((task) => task.status === "completed").length;

  return (
    <main className=" py-2 ">
      <div className="grid grid-cols-[repeat(4,1fr)] gap-y-2.5 gap-x-2.5">
        <div className="cards">
          <div className="flex items-center justify-between">
            <h4>Total Task</h4>
            <ClipboardList
              size={30}
              className="text-indigo-500 p-1 rounded-lg  bg-indigo-200"
            />
          </div>

          <h1 className="text-3xl font-bold">{totalTasks}</h1>
          <p>
            <small className="text-green-600">+12% from last week</small>
          </p>
        </div>
        <div className="cards">
          <div className="flex items-center justify-between">
            <h4>Completed</h4>
            <Check
              size={30}
              className="text-green-500 p-1 rounded-lg  bg-green-200"
            />
          </div>

          <h1 className="text-3xl font-bold">{completed}</h1>
          <p>
            <small className="text-green-600">+8% from last week</small>
          </p>
        </div>
        <div className="cards">
          <div className="flex items-center justify-between">
            <h4>In Progress</h4>
            <Time
              filled
              size={30}
              className="text-orange-500 p-1 rounded-lg  bg-orange-200"
            />
          </div>

          <h1 className="text-3xl font-bold">{inProgress}</h1>
          <p>
            <small className="text-orange-600">+3% from last week</small>
          </p>
        </div>
        <div className="cards">
          <div className="flex items-center justify-between">
            <h4>Pendings</h4>
            <AlertCircle
              filled
              size={30}
              className="text-red-500 p-1 rounded-lg  bg-red-200"
            />
          </div>

          <h1 className="text-3xl font-bold">{pendings}</h1>
          <p>
            <small className="text-red-600"> -2% from last week</small>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
