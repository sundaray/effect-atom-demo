import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { User } from "@/app/schema/user-schema";

interface UserDetailsCardProps {
  user: User;
}

export function UserDetailsCard({ user }: UserDetailsCardProps) {
  return (
    <div className="bg-white border p-6 flex flex-col gap-6 relative max-w-md mx-auto">
      {/* Header Info */}
      <div className="space-y-1">
        <h3 className="font-semibold text-2xl leading-none">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-base text-neutral-600 font-medium">
          {user.company.title}
        </p>
        <p className="text-sm text-neutral-500">{user.company.name}</p>
      </div>

      <p className="text-sm text-neutral-500 break-all">{user.email}</p>

      {/* Address Section */}
      <div className="flex items-start gap-3 bg-neutral-50 p-3 border ">
        <MapPin className="size-5 text-neutral-400 mt-0.5 shrink-0" />
        <div className="text-sm text-neutral-600">
          <p>{user.address.address}</p>
          <p>
            {user.address.city}, {user.address.state}
          </p>
        </div>
      </div>
    </div>
  );
}
