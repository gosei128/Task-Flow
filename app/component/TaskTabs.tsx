"use client";

import { useState } from "react";
import { Circle } from "griddy-icons";
import Tasks from "./Tasks";
import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TaskTab = () => {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <main className="h-full border border-gray-200 bg-white rounded-lg p-2 w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList
          variant="default"
          className=" border-b-2 border-gray-200 justify-start"
        >
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In-Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <div className=" rounded-lg bg-white h-full w-full">
            <Tasks status="pending" />
          </div>
        </TabsContent>
        <TabsContent value="in-progress">
          <div className=" rounded-lg bg-white h-full w-full">
            <Tasks status="in-progress" />
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <div className=" rounded-lg bg-white h-full w-full">
            <Tasks status="completed" />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default TaskTab;
