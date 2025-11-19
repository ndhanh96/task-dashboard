// app/api/tasks/route.ts
import { NextRequest, NextResponse } from "next/server"; // App Router purity—no Pages ghosts
import { addTask, deleteTask, getAllTasks, updateTask } from "@/lib/db";
import { Task } from "@/lib/tasks";

export async function GET() {
  try {
    const tasks = await getAllTasks(); // Await the promise—JS/TS async mastery!
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Already awaited—good
    const id = await addTask(body); // Await here: Resolves to number
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as { id: number } & Partial<Task>;
    await updateTask(body.id, body); // Await the void Promise—ensures completion
    return NextResponse.json({ success: true, body });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = (await req.json()) as { id: number };
    await deleteTask(id); // Await for deletion's promise
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
