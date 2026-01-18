import { Schema } from "effect";

export const UserSchema = Schema.Struct({
  id: Schema.String,
  firstName: Schema.String,
  lastName: Schema.String,
  email: Schema.String,
  company: Schema.Struct({
    name: Schema.String,
    title: Schema.String,
  }),
});

export const UsersResponseSchema = Schema.Struct({
  users: Schema.Array(UserSchema),
});

export const DeleteUserResponseSchema = Schema.Struct({
  ...UserSchema.fields,
  isDeleted: Schema.Boolean,
  deletedOn: Schema.String,
});

// Derive TypeScript types from schemas
export type User = typeof UserSchema.Type;
export type UsersResponse = typeof UsersResponseSchema.Type;
export type DeleteUserResponse = typeof DeleteUserResponseSchema.Type;
