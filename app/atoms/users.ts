import { Effect } from "effect";
import { Atom } from "@effect-atom/atom-react";
import { UsersService } from "@/app/services/users-service";
import { atomRuntime } from "@/runtime";
import { AddUserFormValues } from "../schema/user-schema";
import { debouncedSearchQueryAtom } from "@/app/atoms/search";

export const usersAtom = atomRuntime
  .atom((get) =>
    Effect.gen(function* () {
      const query = get(debouncedSearchQueryAtom);

      return yield* UsersService.getUsers(query);
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
