"use client";

import { useState } from "react";
import Tasks from "./Tasks";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";

import ModalTask from "./Modal";

const TaskTab = () => {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <Card className="h-full border border-gray-200 bg-white rounded-lg w-full">
      <CardHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList
            variant="default"
            className="border-b-2 border-gray-200 justify-start flex-wrap h-auto p-1 overflow-x-auto scrollbar-none"
          >
            <TabsTrigger
              value="pending"
              className="flex-1 sm:flex-none text-xs sm:text-sm px-2 py-1.5 sm:px-4 sm:py-2"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="in-progress"
              className="flex-1 sm:flex-none text-xs sm:text-sm px-2 py-1.5 sm:px-4 sm:py-2"
            >
              In-Progress
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="flex-1 sm:flex-none text-xs sm:text-sm px-2 py-1.5 sm:px-4 sm:py-2"
            >
              Completed
            </TabsTrigger>
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
      </CardHeader>
      <CardFooter>
        <ModalTask>
          <Button className="border font-bold border-dark-blue-500 bg-linear-to-t from-dark-blue-500 to-dark-blue-400 text-white">
            {" "}
            <Plus size={20} /> Add
          </Button>
        </ModalTask>
      </CardFooter>
    </Card>
  );
};

export default TaskTab;
