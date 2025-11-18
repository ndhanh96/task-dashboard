import axios, { AxiosResponse } from "axios";

export default async function deleteTask(
  id: number
): Promise<AxiosResponse<void>> {
  try {
    const response = await axios.delete<void>("/api/tasks", {
      data: { id },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // rethrow server response or the axios error for caller to handle
      throw error.response ?? error;
    }
    throw error;
  }
}
