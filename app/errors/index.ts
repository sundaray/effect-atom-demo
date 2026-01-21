import { Effect, Data } from "effect";

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

export type DeleteUserError = DeleteUserRequestError | DeleteUserResponseError;

// ============ AddUser Errors ============

export class AddUserRequestError extends Data.TaggedError(
  "AddUserRequestError",
)<{
  message: string;
  cause: unknown;
}> {}

export class AddUserResponseError extends Data.TaggedError(
  "AddUserResponseError",
)<{
  message: string;
  cause: unknown;
}> {}

export class AddUserParseError extends Data.TaggedError("AddUserParseError")<{
  message: string;
  cause: unknown;
}> {}

export type AddUserError =
  | AddUserRequestError
  | AddUserResponseError
  | AddUserParseError;

// ============ Combined Service Error ============

export type UserServiceError = GetUsersError | DeleteUserError | AddUserError;
