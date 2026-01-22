import { Effect } from "effect";
import { Atom } from "@effect-atom/atom-react";
import { UsersService } from "@/app/services/users-service";
import { atomRuntime } from "@/runtime";
import { AddUserFormValues } from "../schema/user-schema";
import { debouncedSearchQueryAtom } from "@/app/atoms/search";
import { pageAtom } from "@/app/atoms/page";
import { Reactivity } from "@effect/experimental";

let usersFetchCount = 0;

const usersResponseAtom = atomRuntime
  .atom((get) =>
    Effect.gen(function* () {
      const query = get(debouncedSearchQueryAtom);
      const page = get(pageAtom);

      console.log(
        `[USERS ATOM] Fetching users... (count: ${usersFetchCount}, query: "${query}", page: ${page})`,
      );

      const result = yield* UsersService.getUsers(query, page);

      console.log(`[USERS ATOM] Fetched ${result.users.length} users`);

      return result;
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
    console.log(`[DELETE USER] Starting delete for user: ${userId}`);

    (yield* UsersService.deleteUser(userId),);

    console.log(
      `[DELETE USER] Delete completed, invalidation should have fired`,
    );
  }),
  { reactivityKeys: ["users"] }
);

// ============ Add User ============
export const addUserAtom = atomRuntime.fn(
  Effect.fnUntraced(function* (user: AddUserFormValues) {
    return yield* UsersService.addUser(user);
  }),
  { reactivityKeys: ["users"] },
);
