import { Effect } from "effect";
import {
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
  FetchHttpClient,
} from "@effect/platform";
import {
  UserSchema,
  UsersSchema,
  AddUserFormValues,
  type User,
  type UsersResponse,
} from "@/app/schema/user-schema";
import {
  AddUserError,
  GetUsersError,
  GetUsersRequestError,
  GetUsersParseError,
  GetUsersResponseError,
  DeleteUserError,
  DeleteUserRequestError,
  DeleteUserResponseError,
  AddUserRequestError,
  AddUserResponseError,
  AddUserParseError,
} from "@/app/errors";

export class UsersService extends Effect.Service<UsersService>()(
  "app/UsersService",
  {
    effect: Effect.gen(function* () {
      const client = (yield* HttpClient.HttpClient).pipe(
        HttpClient.filterStatusOk,
      );
      function getUsers(
        query: string,
        page: number,
      ): Effect.Effect<UsersResponse, GetUsersError> {
        const request = HttpClientRequest.get(
          "http://localhost:3001/users",
        ).pipe(
          HttpClientRequest.setUrlParams({
            q: query ?? "",
            _page: page.toString(),
            _limit: "8",
          }),
        );

        return client.execute(request).pipe(
          Effect.flatMap((response) =>
            Effect.all({
              users: HttpClientResponse.schemaBodyJson(UsersSchema)(response),
              usersCount: Effect.succeed(
                Number(response.headers["x-total-count"]),
              ),
            }),
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
            ParseError: (parseError) => {
              return Effect.fail(
                new GetUsersParseError({
                  message: "Failed to parse getUsers response",
                  cause: parseError,
                }),
              );
            },
          }),
        );
      }

      function deleteUser(
        userId: string,
      ): Effect.Effect<void, DeleteUserError> {
        return client.del(`http://localhost:3001/users/${userId}`).pipe(
          Effect.asVoid,
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
          }),
        );
      }

      function addUser(
        user: AddUserFormValues,
      ): Effect.Effect<User, AddUserError> {
        return HttpClientRequest.post("http://localhost:3001/users").pipe(
          HttpClientRequest.bodyJson(user),
          Effect.flatMap(client.execute),
          Effect.flatMap(HttpClientResponse.schemaBodyJson(UserSchema)),
          Effect.catchTags({
            HttpBodyError: (err) =>
              Effect.fail(
                // Change the error name
                new AddUserRequestError({
                  message: "Failed to serialize addUser request body",
                  cause: err,
                }),
              ),
            RequestError: (err) =>
              Effect.fail(
                new AddUserRequestError({
                  message: "Failed to create user request",
                  cause: err,
                }),
              ),
            ResponseError: (err) =>
              Effect.fail(
                new AddUserResponseError({
                  message: `Failed to create user: status ${err.response.status}`,
                  cause: err,
                }),
              ),
            ParseError: (err) =>
              Effect.fail(
                new AddUserParseError({
                  message: "Failed to parse created user response",
                  cause: err,
                }),
              ),
          }),
        );
      }

      return { getUsers, deleteUser, addUser };
    }),
    dependencies: [FetchHttpClient.layer],
    accessors: true,
  },
) {}
