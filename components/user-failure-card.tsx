import { Cause, Option, Match } from "effect";
import { AlertCircleIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { GetUsersError } from "@/app/services/users-service";

interface UserFailureCardProps {
  cause: Cause.Cause<GetUsersError>;
}

function getErrorTitle(error: GetUsersError): string {
  return Match.value(error).pipe(
    Match.tag("GetUsersRequestError", () => "Request Error"),
    Match.tag("GetUsersResponseError", () => "Response Error"),
    Match.tag("GetUsersParseError", () => "Parse Error"),
    Match.exhaustive,
  );
}

export function UserFailureCard({ cause }: UserFailureCardProps) {
  const failure = Cause.failureOption(cause);

  const errorTitle = failure.pipe(
    Option.map(getErrorTitle),
    Option.getOrElse(() => "Unexpected Error"),
  );

  const errorMessage = failure.pipe(
    Option.map((error) => error.message),
    Option.getOrElse(() => "An unexpected error occurred"),
  );

  return (
    <div className="flex items-center justify-center py-12 border">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircleIcon className="text-red-600 size-10" />
          </EmptyMedia>
          <EmptyTitle className="text-red-600 text-lg font-bold">
            {errorTitle}
          </EmptyTitle>
          <EmptyDescription className="text-sm">
            {errorMessage}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
