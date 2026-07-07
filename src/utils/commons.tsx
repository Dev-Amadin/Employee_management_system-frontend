import { toast } from "sonner";

export function toaster(isSuccess: boolean, title: string, description: string) {
    if (isSuccess) {
      return toast.success(title, {
        description: description,
        position: "top-right",
        classNames: {
          success: "!bg-green-300",
        },
      });
    } else {
      return toast.error(title, {
        description: description,
        position: "top-right",
        classNames: {
          error: "!bg-rose-400",
        },
      });
    }
  }