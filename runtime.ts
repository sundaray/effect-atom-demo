import { UsersService } from "@/app/services/users-service";
import { Atom } from "@effect-atom/atom-react";

export const atomRuntime = Atom.runtime(UsersService.Default);
