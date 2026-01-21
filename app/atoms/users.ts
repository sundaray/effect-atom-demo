import { Effect } from "effect";
import { Atom } from "@effect-atom/atom-react";
import { UsersService } from "@/app/services/users-service";
import { atomRuntime } from "@/runtime";
import { UserSearch } from "lucide-react";
import { AddUserFormValues } from "../schema/user-schema";

export const usersAtom = atomRuntime
  .atom(
    Effect.gen(function* () {
      return yield* UsersService.getUsers();
    }),
  )
  .pipe(Atom.keepAlive, Atom.withReactivity(["users"])); // Subcribe to users key

export const deleteUserAtom = atomRuntime.fn(
  Effect.fnUntraced(function* (userId: string) {
    return yield* UsersService.deleteUser(userId);
  }),
  { reactivityKeys: ["users"] }, // Invalidate "users" when done
);

export const addUserAtom = atomRuntime.fn(
  Effect.fnUntraced(function* (user: AddUserFormValues) {
    return yield* UsersService.addUser(user);
  }),
  { reactivityKeys: ["users"] },
);
