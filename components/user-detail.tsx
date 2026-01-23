"use client";

import { useParams } from "next/navigation";
import { Result, useAtomValue } from "@effect-atom/atom-react";

import { userAtom } from "@/app/atoms/user";

import { UserDetailsCard } from "@/components/user-details-card";
import { UserFailureCard } from "@/components/user-failure-card";
import { UserGridSpinner } from "@/components/user-grid-spinner";

export function UserDetail() {
  const params = useParams<{ id: string }>();
  const result = useAtomValue(userAtom(params.id));

  return Result.builder(result)
    .onInitial(() => <UserGridSpinner />)
    .onFailure((cause) => <UserFailureCard cause={cause} />)
    .onSuccess((user, { waiting }) => (
      <div className={waiting ? "opacity-50 transition-opacity" : ""}>
        <UserDetailsCard user={user} />
      </div>
    ))
    .render();
}
