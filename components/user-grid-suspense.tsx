import { Suspense } from "react";
import { useAtomSuspense } from "@effect-atom/atom-react";
import { usersAtom } from "@/app/atoms/users";
import { UserSuccessCard } from "@/components/user-success-card";
import { UserEmptyCard } from "@/components/user-empty-card";
import { UserGridSkeleton } from "@/components/user-skeleton";

function UsergridContent() {
  const result = useAtomSuspense(usersAtom);

  const users = result.value;

  return (
    <div className={result.waiting ? "opacity-50 transition-opacity" : ""}>
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
  );
}

export function UserGridSuspense() {
  return (
    <Suspense fallback={<UserGridSkeleton />}>
      <UsergridContent />
    </Suspense>
  );
}
