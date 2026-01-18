import { Effect, Data } from "effect";
import {
  HttpClient,
  HttpClientResponse,
  FetchHttpClient,
} from "@effect/platform";
import {
  UsersResponseSchema,
  DeleteUserResponseSchema,
} from "@/app/schema/user-schema";
import type {
  UsersResponse,
  DeleteUserResponse,
} from "@/app/schema/user-schema";

// ============ GetUsers Errors ============

export class GetUsersRequestError extends Data.TaggedError(
  "GetUsersRequestError",
)<{
  message: string;
  cause: unknown;
}> {}

export class GetUsersResponseError extends Data.TaggedError(
  "GetUsersResponseError",
)<{
  message: string;
  cause: unknown;
}> {}

export class GetUsersParseError extends Data.TaggedError("GetUsersParseError")<{
  message: string;
  cause: unknown;
}> {}

export type GetUsersError =
  | GetUsersRequestError
  | GetUsersResponseError
  | GetUsersParseError;

// ============ DeleteUser Errors ============

export class DeleteUserRequestError extends Data.TaggedError(
  "DeleteUserRequestError",
)<{
  message: string;
  cause: unknown;
}> {}

export class DeleteUserResponseError extends Data.TaggedError(
  "DeleteUserResponseError",
)<{
  message: string;
  cause: unknown;
}> {}

export class DeleteUserParseError extends Data.TaggedError(
  "DeleteUserParseError",
)<{
  message: string;
  cause: unknown;
}> {}

export type DeleteUserError =
  | DeleteUserRequestError
  | DeleteUserResponseError
  | DeleteUserParseError;

// ============ Combined Service Error ============

export type UserServiceError = GetUsersError | DeleteUserError;

export class UsersService extends Effect.Service<UsersService>()(
  "app/UsersService",
  {
    effect: Effect.gen(function* () {
      const client = (yield* HttpClient.HttpClient).pipe(
        HttpClient.filterStatusOk,
      );
      function getUsers(): Effect.Effect<UsersResponse, UserServiceError> {
        return client.get("http://localhost:3001/users").pipe(
          Effect.flatMap(
            HttpClientResponse.schemaBodyJson(UsersResponseSchema),
          ),
          Effect.catchTags({
            RequestError: (requestError) =>
              Effect.fail(
                new GetUsersRequestError({
                  message: "Failed to get users",
                  cause: requestError,
                }),
              ),
            ResponseError: (responseError) =>
              Effect.fail(
                new GetUsersResponseError({
                  message:
                    "Failed to get users: status ${responseError.response.status}",
                  cause: responseError,
                }),
              ),
            ParseError: (parseError) =>
              Effect.fail(
                new GetUsersParseError({
                  message: "Failed to parse getUsers response",
                  cause: parseError,
                }),
              ),
          }),
        );
      }

      function deleteUser(
        userId: number,
      ): Effect.Effect<DeleteUserResponse, DeleteUserError> {
        return client.del(`http://localhost:3000/users/${userId}`).pipe(
          Effect.flatMap(
            HttpClientResponse.schemaBodyJson(DeleteUserResponseSchema),
          ),
          Effect.catchTags({
            RequestError: (requestError) =>
              Effect.fail(
                new DeleteUserRequestError({
                  message: `Failed to delete user ${userId}`,
                  cause: requestError,
                }),
              ),
            ResponseError: (responseError) =>
              Effect.fail(
                new DeleteUserResponseError({
                  message: `Failed to delete user ${userId}: status ${responseError.response.status}`,
                  cause: responseError,
                }),
              ),
            ParseError: (parseError) =>
              Effect.fail(
                new DeleteUserParseError({
                  message: `Failed to parse delete response for user ${userId}`,
                  cause: parseError,
                }),
              ),
          }),
        );
      }

      return { getUsers, deleteUser };
    }),
    dependencies: [FetchHttpClient.layer],
    accessors: true,
  },
) {}
