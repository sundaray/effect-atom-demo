import { Layer } from "effect";
import { Reactivity } from "@effect/experimental";
import { UsersService } from "@/app/services/users-service";
import { Atom } from "@effect-atom/atom-react";

Atom.runtime.addGlobalLayer(Reactivity.layer);

const layers = Layer.mergeAll(UsersService.Default);

export const atomRuntime = Atom.runtime(layers);
