import { Task } from "@/lib/tasks";
import axios from "axios";

export default async function updateTask(
  payload: { id: number } & Partial<Task>
) {
  try {
    const res = await axios.put("/api/tasks", { ...payload });
    console.log(res);
    return res;
  } catch (err) {
    throw err;
  }
}
