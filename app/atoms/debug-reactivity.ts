import { Effect } from "effect";
import { Reactivity } from "@effect/experimental";
import { Atom } from "@effect-atom/atom-react";
import { atomRuntime } from "@/runtime";

// A simple counter that we can observe
let fetchCount = 0;

// Debug atom that logs every time it's evaluated
export const debugAtom = atomRuntime
  .atom(
    Effect.gen(function* () {
      fetchCount++;
      const timestamp = new Date().toISOString();
      console.log(
        `[DEBUG ATOM] Fetching... (count: ${fetchCount}, time: ${timestamp})`,
      );

      // Simulate a small delay like a real API call
      yield* Effect.sleep("100 millis");

      return { fetchCount, timestamp };
    }),
  )
  .pipe(Atom.keepAlive, atomRuntime.factory.withReactivity(["debug"]));

// Debug mutation that should trigger the atom to refetch
export const debugMutationAtom = atomRuntime.fn(
  Effect.fnUntraced(function* () {
    console.log("[DEBUG MUTATION] Starting mutation...");

    // Try all three approaches:

    // Approach 1: Using Reactivity.mutation
    yield* Reactivity.mutation(
      Effect.sync(() => {
        console.log("[DEBUG MUTATION] Inside mutation effect");
      }),
      ["debug"],
    );

    console.log("[DEBUG MUTATION] Mutation completed");
  }),
);

// Alternative: Direct invalidation
export const debugInvalidateAtom = atomRuntime.fn(
  Effect.fnUntraced(function* () {
    console.log("[DEBUG INVALIDATE] Starting invalidation...");
    yield* Reactivity.invalidate(["debug"]);
    console.log("[DEBUG INVALIDATE] Invalidation completed");
  }),
);

// Check if Reactivity service is available
export const checkReactivityAtom = atomRuntime.fn(
  Effect.fnUntraced(function* () {
    console.log("[CHECK] Attempting to access Reactivity service...");
    const reactivity = yield* Reactivity.Reactivity;
    console.log("[CHECK] Reactivity service found:", !!reactivity);
    console.log("[CHECK] Reactivity methods:", Object.keys(reactivity));
    return !!reactivity;
  }),
);
