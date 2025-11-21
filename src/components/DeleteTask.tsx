import { Button } from "antd";
import { useRouter } from "next/navigation";
import { deleteTask } from "@/lib/db";

interface DeleteTaskProps {
  id: number;
  startTransition: React.TransitionStartFunction;
  isPending: boolean;
}

function DeleteTask({ id, startTransition, isPending }: DeleteTaskProps) {
  const router = useRouter();
  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await deleteTask(id);
        router.refresh();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    });
  };
  return (
    <Button loading={isPending} onClick={handleDelete} danger>
      Delete
    </Button>
  );
}
export default DeleteTask;
