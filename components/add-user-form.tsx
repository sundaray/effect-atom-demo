"use client";

import { useState, useId } from "react";
import { useForm } from "react-hook-form";
import { effectTsResolver } from "@hookform/resolvers/effect-ts";
import { useAtomSet } from "@effect-atom/atom-react";
import { Exit, Cause, Option } from "effect";
import { Loader2 } from "lucide-react";
import { useSpinDelay } from "@/hooks/use-spin-delay";

import {
  AddUserFormSchema,
  type AddUserFormValues,
} from "@/app/schema/user-schema";
import { addUserAtom } from "@/app/atoms/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  FormErrorMessage,
  FormFieldErrorMessage,
  FormSuccessMessage,
} from "@/components/form-messages";

export function AddUserForm() {
  const id = useId(); // Generate a unique base ID for this form instance
  const addUser = useAtomSet(addUserAtom, { mode: "promiseExit" });

  const [globalError, setGlobalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddUserFormValues>({
    resolver: effectTsResolver(AddUserFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: { name: "", title: "" },
    },
  });

  const showSpinner = useSpinDelay(isSubmitting, {
    delay: 0,
    minDuration: 500,
  });

  const onSubmit = async (data: AddUserFormValues) => {
    setGlobalError(null);
    setSuccessMessage(null);
    const exit = await addUser(data);
    if (Exit.isSuccess(exit)) {
      setSuccessMessage("A new user has been added successfully.");
      reset(); // Clear form inputs
    } else {
      const failureOption = Cause.failureOption(exit.cause);
      const errorMessage = Option.isSome(failureOption)
        ? failureOption.value.message
        : "An unexpected error occurred";
      setGlobalError(errorMessage);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">User Details</CardTitle>
        <CardDescription className="text-sm">
          Fill in the information below to create a new account.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        {/* Global Feedback Messages */}
        <FormSuccessMessage message={successMessage} />
        <FormErrorMessage message={globalError} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor={`${id}-firstName`}>First Name</Label>
            <Input
              id={`${id}-firstName`}
              {...register("firstName")}
              aria-invalid={!!errors.firstName}
              aria-describedby={
                errors.firstName ? `${id}-firstName-error` : undefined
              }
            />
            <FormFieldErrorMessage
              id={`${id}-firstName-error`}
              message={errors.firstName?.message}
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor={`${id}-lastName`}>Last Name</Label>
            <Input
              id={`${id}-lastName`}
              {...register("lastName")}
              aria-invalid={!!errors.lastName}
              aria-describedby={
                errors.lastName ? `${id}-lastName-error` : undefined
              }
            />
            <FormFieldErrorMessage
              id={`${id}-lastName-error`}
              message={errors.lastName?.message}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor={`${id}-email`}>Email</Label>
            <Input
              id={`${id}-email`}
              type="email"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? `${id}-email-error` : undefined}
            />
            <FormFieldErrorMessage
              id={`${id}-email-error`}
              message={errors.email?.message}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor={`${id}-companyName`}>Company Name</Label>
              <Input
                id={`${id}-companyName`}
                {...register("company.name")}
                aria-invalid={!!errors.company?.name}
                aria-describedby={
                  errors.company?.name ? `${id}-companyName-error` : undefined
                }
              />
              <FormFieldErrorMessage
                id={`${id}-companyName-error`}
                message={errors.company?.name?.message}
              />
            </div>

            {/* Job Title */}
            <div className="space-y-2">
              <Label htmlFor={`${id}-jobTitle`}>Job Title</Label>
              <Input
                id={`${id}-jobTitle`}
                {...register("company.title")}
                aria-invalid={!!errors.company?.title}
                aria-describedby={
                  errors.company?.title ? `${id}-jobTitle-error` : undefined
                }
              />
              <FormFieldErrorMessage
                id={`${id}-jobTitle-error`}
                message={errors.company?.title?.message}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {showSpinner && <Loader2 className="size-4 animate-spin" />}
              Create User
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
