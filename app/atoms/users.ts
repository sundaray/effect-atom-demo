import { Effect } from "effect";
import { Atom } from "@effect-atom/atom-react";
import { UsersService } from "@/app/services/users-service";

// Create an AtomRuntime from the UsersService layer

const usersRuntime = Atom.runtime(UsersService.Default);

export const usersAtom = usersRuntime
  .atom(
    Effect.gen(function* () {
      return yield* UsersService.getUsers();
    }),
  )
  .pipe(Atom.keepAlive, Atom.withReactivity(["users"])); // Subcribe to users key

export const deleteUserAtom = usersRuntime.fn(
  Effect.fnUntraced(function* (userId: string) {
    return yield* UsersService.deleteUser(userId);
  }),
  { reactivityKeys: ["users"] }, // Invalidate "users" when done
);
