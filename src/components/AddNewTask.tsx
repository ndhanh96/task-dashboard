// 'use server';
import React from "react";
import { TaskStatus } from "@/lib/tasks";
import axios from "axios";

interface NewTaskFormValues {
  tasktitle: string;
  description: string;
  status: TaskStatus;
}

export const addNewTask = async ({
  tasktitle,
  description,
  status,
}: NewTaskFormValues) => {
  const payload = {
    title: tasktitle,
    description,
    status: status,
    dueDate: new Date().toISOString(),
  };
  try {
    const res = await axios.post("/api/tasks", payload);
    return res;
  } catch (error) {
    throw error;
  }
};
