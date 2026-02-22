import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Task from "@/app/models/Task";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();
    const tasks = await Task.find();
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
    const { title, description, priority, status, dueDate } =
      await request.json();

    const newTask = await Task.create({
      title,
      description,
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
