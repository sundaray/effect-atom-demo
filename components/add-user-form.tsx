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
import { Card, CardContent } from "@/components/ui/card";
import {
  FormErrorMessage,
  FormFieldErrorMessage,
  FormSuccessMessage,
} from "@/components/form-messages";

export function AddUserForm() {
  const id = useId();
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
      address: { address: "", city: "", state: "" },
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
      reset();
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
      <CardContent className="mt-4">
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

          {/* Address Info */}
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor={`${id}-address`}>Street Address</Label>
              <Input
                id={`${id}-address`}
                {...register("address.address")}
                aria-invalid={!!errors.address?.address}
              />
              <FormFieldErrorMessage
                id={`${id}-address-error`}
                message={errors.address?.address?.message}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`${id}-city`}>City</Label>
                <Input
                  id={`${id}-city`}
                  {...register("address.city")}
                  aria-invalid={!!errors.address?.city}
                />
                <FormFieldErrorMessage
                  id={`${id}-city-error`}
                  message={errors.address?.city?.message}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${id}-state`}>State</Label>
                <Input
                  id={`${id}-state`}
                  {...register("address.state")}
                  aria-invalid={!!errors.address?.state}
                />
                <FormFieldErrorMessage
                  id={`${id}-state-error`}
                  message={errors.address?.state?.message}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {showSpinner && <Loader2 className="size-4 animate-spin" />}
              Add User
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
