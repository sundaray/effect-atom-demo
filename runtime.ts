import { Layer } from "effect";
import { Reactivity } from "@effect/experimental";
import { UsersService } from "@/app/services/users-service";
import { Atom } from "@effect-atom/atom-react";

const layers = Layer.mergeAll(UsersService.Default, Reactivity.layer);

export const atomRuntime = Atom.runtime(layers);
