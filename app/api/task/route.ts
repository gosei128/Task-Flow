import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Task from "@/app/models/Task";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const filter = status ? { status } : {};
    const tasks = await Task.find(filter);
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextResponse): Promise<NextResponse> {
  try {
    await connectDB();

    // DEBUG: inspect the schema the model is using
    console.log("Task schema paths:", Object.keys(Task.schema.paths));

    const { taskName, priority, status, dueDate } = await request.json();

    const newTask = await Task.create({
      taskName,
      priority,
      status,
      dueDate,
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
  }
}
