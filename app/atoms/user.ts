import { Effect } from "effect";
import { Atom } from "@effect-atom/atom-react";
import { UsersService } from "@/app/services/users-service";
import { atomRuntime } from "@/runtime";

export const userAtom = Atom.family((id: string) =>
  atomRuntime
    .atom(
      Effect.gen(function* () {
        return yield* UsersService.getUser(id);
      }),
    )
    .pipe(Atom.keepAlive),
);
