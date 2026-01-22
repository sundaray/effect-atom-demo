"use client";

import { useAtomValue, useAtomSet, Result } from "@effect-atom/atom-react";
import {
  debugAtom,
  debugMutationAtom,
  debugInvalidateAtom,
  checkReactivityAtom,
} from "@/app/atoms/debug-reactivity";
import { Button } from "@/components/ui/button";

export function DebugReactivity() {
  const result = useAtomValue(debugAtom);
  const triggerMutation = useAtomSet(debugMutationAtom);
  const triggerInvalidate = useAtomSet(debugInvalidateAtom);
  const checkReactivity = useAtomSet(checkReactivityAtom);

  return (
    <div className="p-4 border rounded-lg space-y-4 bg-yellow-50">
      <h2 className="font-bold text-lg">Reactivity Debug Panel</h2>

      <div className="space-y-2">
        <p className="text-sm font-medium">Current State:</p>
        {Result.match(result, {
          onInitial: () => <p>Initial...</p>,
          onFailure: (cause) => (
            <p className="text-red-500">Error: {String(cause)}</p>
          ),
          onSuccess: (data) => (
            <pre className="bg-gray-100 p-2 rounded text-xs">
              {JSON.stringify(data.value, null, 2)}
            </pre>
          ),
        })}
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            console.log("--- Triggering Mutation ---");
            triggerMutation();
          }}
        >
          Test Mutation
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            console.log("--- Triggering Invalidate ---");
            triggerInvalidate();
          }}
        >
          Test Invalidate
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            console.log("--- Checking Reactivity ---");
            checkReactivity();
          }}
        >
          Check Reactivity Service
        </Button>
      </div>

      <p className="text-xs text-gray-500">
        Open browser console to see debug logs
      </p>
    </div>
  );
}
