"use client";

import { useState } from "react";
import Tasks from "./Tasks";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ModalTask from "./Modal";

const TaskTab = () => {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <Card className="h-full border border-gray-200 bg-white rounded-lg w-full">
      <CardHeader>
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
