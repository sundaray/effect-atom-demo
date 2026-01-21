import { useAtomValue, Result } from "@effect-atom/atom-react";
import { usersAtom } from "@/app/atoms/users";
import { UserGridSkeleton } from "@/components/user-skeleton";
import { UserSuccessCard } from "@/components/user-success-card";
import { UserFailureCard } from "@/components/user-failure-card";
import { UserEmptyCard } from "@/components/user-empty-card";

export function UserGrid() {
  const usersResult = useAtomValue(usersAtom);

  return Result.builder(usersResult)
    .onInitial(() => <UserGridSkeleton />)
    .onFailure((cause) => <UserFailureCard cause={cause} />)
    .onSuccess((users, { waiting }) => (
      <div className={waiting ? "opacity-50 transition-opacity" : ""}>
        {users.length === 0 ? (
          <UserEmptyCard />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {users.map((user) => (
              <UserSuccessCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    ))
    .render();
}
