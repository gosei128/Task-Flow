"use client";
import { useTaskContext } from "../context/taskContext";
import { ClipboardList, Check, Time, AlertCircle } from "griddy-icons";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Dashboard = () => {
  const { tasks } = useTaskContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const totalTasks = tasks.length;
  const pendings = tasks.filter((task) => task.status === "pending").length;
  const inProgress = tasks.filter(
    (task) => task.status === "in-progress",
  ).length;
  const completed = tasks.filter((task) => task.status === "completed").length;
  return (
    <main className="py-2">
      <div
        ref={scrollRef}
        className="flex tablet:grid mobile:w-sm desktop:w-full  overflow-x-auto snap-x snap-mandatory tablet:snap-none tablet:grid-cols-4 gap-4 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="cards flex-none w-full snap-center tablet:w-auto">
          <div className="flex items-center justify-between">
            <h4>Total Task</h4>
            <ClipboardList
              size={30}
              className="text-indigo-500 p-1 rounded-lg bg-indigo-200"
            />
          </div>
          <h1 className="text-3xl font-bold">{totalTasks}</h1>
          <p>
            <small className="text-green-600">+12% from last week</small>
          </p>
        </div>
        <div className="cards flex-none w-full snap-center tablet:w-auto">
          <div className="flex items-center justify-between">
            <h4>Completed</h4>
            <Check
              size={30}
              className="text-green-500 p-1 rounded-lg bg-green-200"
            />
          </div>
          <h1 className="text-3xl font-bold">{completed}</h1>
          <p>
            <small className="text-green-600">+8% from last week</small>
          </p>
        </div>
        <div className="cards flex-none w-full snap-center tablet:w-auto">
          <div className="flex items-center justify-between">
            <h4>In Progress</h4>
            <Time
              filled
              size={30}
              className="text-orange-500 p-1 rounded-lg bg-orange-200"
            />
          </div>
          <h1 className="text-3xl font-bold">{inProgress}</h1>
          <p>
            <small className="text-orange-600">+3% from last week</small>
          </p>
        </div>
        <div className="cards flex-none w-full snap-center tablet:w-auto">
          <div className="flex items-center justify-between">
            <h4>Pendings</h4>
            <AlertCircle
              filled
              size={30}
              className="text-red-500 p-1 rounded-lg bg-red-200"
            />
          </div>
          <h1 className="text-3xl font-bold">{pendings}</h1>
          <p>
            <small className="text-red-600">-2% from last week</small>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mb-2 tablet:hidden">
        <button
          onClick={scrollLeft}
          className="p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={scrollRight}
          className="p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </main>
  );
};

export default Dashboard;
