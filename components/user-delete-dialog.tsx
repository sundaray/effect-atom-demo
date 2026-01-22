"use client";

import { useAtomRefresh } from "@effect-atom/atom-react";
import { usersAtom } from "@/app/atoms/users";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import { Exit, Cause, Option } from "effect";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAtomSet } from "@effect-atom/atom-react";
import { deleteUserAtom } from "@/app/atoms/users";
import type { User } from "@/app/schema/user-schema";
import { useSpinDelay } from "@/hooks/use-spin-delay";

interface UserDeleteDialogProps {
  user: User;
  trigger: React.ReactNode;
}

export function UserDeleteDialog({ user, trigger }: UserDeleteDialogProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteUser = useAtomSet(deleteUserAtom, { mode: "promiseExit" });

  const showSpinner = useSpinDelay(isDeleting, {
    delay: 0,
    minDuration: 500,
  });

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    // Clear error when dialog opens or closes
    if (!isOpen) {
      setError(null);
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    setError(null);

    const exit = await deleteUser(user.id);

    setIsDeleting(false);

    if (Exit.isSuccess(exit)) {
      router.refresh();
      setOpen(false);
    } else {
      const failureOption = Cause.failureOption(exit.cause);
      const errorMessage = Option.isSome(failureOption)
        ? failureOption.value.message
        : "An unexpected error occurred";
      setError(errorMessage);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-110">
        <DialogHeader>
          <DialogTitle>
            Delete {user.firstName} {user.lastName}?
          </DialogTitle>
          <DialogDescription>
            Are you sure? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200">
            <AlertCircle className="size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {showSpinner && <Loader2 className="size-4 animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
