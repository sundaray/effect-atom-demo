import { Effect } from "effect";
import { Atom } from "@effect-atom/atom-react";
import { UsersService } from "@/app/services/users-service";
import { atomRuntime } from "@/runtime";
import { AddUserFormValues } from "../schema/user-schema";
import { debouncedSearchQueryAtom } from "@/app/atoms/search";
import { pageAtom } from "@/app/atoms/page";

const usersResponseAtom = atomRuntime
  .atom((get) =>
    Effect.gen(function* () {
      const query = get(debouncedSearchQueryAtom);
      const page = get(pageAtom);

      return yield* UsersService.getUsers(query, page);
    }),
  )
  .pipe(Atom.keepAlive, Atom.withReactivity(["users"]));

// ============ Get Users ============
export const usersAtom = Atom.mapResult(
  usersResponseAtom,
  (result) => result.users,
);

// ============ Get Users Count ============
export const usersCountAtom = Atom.mapResult(
  usersResponseAtom,
  (result) => result.usersCount,
);

// ============ Delete User ============
export const deleteUserAtom = atomRuntime.fn(
  Effect.fnUntraced(function* (userId: string) {
    return yield* UsersService.deleteUser(userId);
  }),
  { reactivityKeys: ["users"] }, // Invalidate "users" when done
);

// ============ Add User ============
export const addUserAtom = atomRuntime.fn(
  Effect.fnUntraced(function* (user: AddUserFormValues) {
    return yield* UsersService.addUser(user);
  }),
  { reactivityKeys: ["users"] },
);
