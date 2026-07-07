import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";

type size = "sm:max-w-xs" | "sm:max-w-sm" | "sm:max-w-md" | "sm:max-w-lg" | "sm:max-w-xl" | "sm:max-w-2xl" | "sm:max-w-3xl"

type ModalProps = {
  title: string;
  subtitle?: string;
  open: boolean;
  footer: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  size: size
};

export default function Modal({
  title,
  subtitle,
  open,
  setOpen,
  children,
  footer,
  size
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={`bg-light ring-0 p-4 ${size}`}>
        <DialogHeader>
          <DialogTitle className={"text-primary  capitalize"}>
            {title}
          </DialogTitle>
          <DialogDescription className={" text-slate-700"}>
            {subtitle}
          </DialogDescription>
        </DialogHeader>
        {children}

        {footer && (
          <DialogFooter className="sm:justify-start">
            <DialogClose
              render={
                <Button
                  type="button"
                  className={
                    "p-2 rounded-full hover:cursor-pointer hover:bg-purple-accent/10 transition-colors duration-300"
                  }
                >
                  Close
                </Button>
              }
            />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
