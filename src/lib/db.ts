// src/lib/db.ts
import Database from "better-sqlite3";
import { Task, TaskStatus } from "./tasks";

const db = new Database("tasks.db", { verbose: console.log }); // File in root, logs for debug
db.pragma("journal_mode = WAL");

// Create table if not exists - like MySQL schema
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL,
    dueDate TEXT
  )
`);

// Typed CRUD functions
export function getAllTasks(): Task[] {
  const stmt = db.prepare("SELECT * FROM tasks ORDER BY dueDate DESC");
  const rows = stmt.all() as Task[];
  return rows.map((row) => ({
    id: row.id as number,
    title: row.title as string,
    description: row.description as string | undefined,
    status: row.status as TaskStatus,
    dueDate: row.dueDate ? row.dueDate : undefined,
  }));
}

export function addTask(task: Omit<Task, "id">): number {
  const stmt = db.prepare(
    "INSERT INTO tasks (title, description, status, dueDate) VALUES (?, ?, ?, ?)"
  );
  const info = stmt.run(
    task.title,
    task.description || null,
    task.status,
    task.dueDate ? task.dueDate : null
  );
  return info.lastInsertRowid as number;
}

export function updateTask(id: number, task: Partial<Task>): void {
  const fields = [];
  const values = [];
  const currentTaskStmt = db.prepare("SELECT * FROM tasks WHERE id = ?");
  const currentTask = currentTaskStmt.get(id) as Task;
  if (!currentTask) {
    throw new Error(`Task with id ${id} not found`);
  }
  if (task.title !== undefined && task.title !== currentTask.title) {
    fields.push("title = ?");
    values.push(task.title);
  }
  if (
    task.description !== undefined &&
    task.description !== currentTask.description
  ) {
    fields.push("description = ?");
    values.push(task.description);
  }
  if (task.status !== undefined && task.status !== currentTask.status) {
    fields.push("status = ?");
    values.push(task.status);
  }
  if (task.dueDate !== undefined && task.dueDate !== currentTask.dueDate) {
    fields.push("dueDate = ?");
    values.push(task.dueDate ? task.dueDate : null);
  }
  if (fields.length === 0) return;

  const stmt = db.prepare(`UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`);
  stmt.run(...values, id);
}

export function deleteTask(id: number): void {
  const stmt = db.prepare("DELETE FROM tasks WHERE id = ?");
  stmt.run(id);
}

// Init: Call once to ensure DB ready
getAllTasks(); // Triggers create if needed

// Add to bottom of src/lib/db.ts

function seedMockData() {
  const countStmt = db.prepare("SELECT COUNT(*) as count FROM tasks");
  const { count } = countStmt.get() as { count: number };

  if (count === 0) {
    addTask({
      title: "Buy milk",
      description: "Get whole milk from the store",
      status: TaskStatus.PENDING,
      dueDate: new Date("2025-11-15").toISOString(),
    });
    addTask({
      title: "Code review",
      description: "Review pull request #42",
      status: TaskStatus.IN_PROGRESS,
      dueDate: new Date("2025-11-13").toISOString(),
    });
    addTask({
      title: "Deploy app",
      description: "Push to Vercel",
      status: TaskStatus.COMPLETED,
      dueDate: new Date("2025-11-12").toISOString(),
    });
  }
}

// Seed on load
seedMockData();
