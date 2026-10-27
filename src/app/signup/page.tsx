"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const SignUp = () => {
  const handleEmailSignUp = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      image: string;
      password: string;
    };

    const { data, error } = await authClient.signUp.email({
      ...user,
    });

    if (data) {
      redirect("/")
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 sm:px-6">
      <div className="flex w-full max-w-md flex-col gap-5">
        <div className="text-center">
          <h1 className="text-3xl font-normal tracking-tight sm:text-4xl">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Start your adventure with Wanderlust
          </p>
        </div>

        <Card className="w-full rounded-none border border-gray-100 bg-white shadow-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl">Create Account</CardTitle>
            <CardDescription>Sign up to start your adventure</CardDescription>
          </CardHeader>

          <CardContent className="px-5 pb-6 sm:px-6">
            <form onSubmit={handleEmailSignUp}>
              <FieldGroup className="gap-3">
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-none bg-gray-50"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="name">ImageURL</FieldLabel>
                  <Input
                    id="image"
                    type="url"
                    name="image"
                    placeholder="Enter your image URL"
                    required
                    className="w-full rounded-none bg-gray-50"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Email Address</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-none bg-gray-50"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    required
                    className="w-full rounded-none bg-gray-50"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    name="password"
                    placeholder="Confirm your password"
                    required
                    className="w-full rounded-none bg-gray-50"
                  />
                </Field>

                <Field className="pt-1">
                  <Button
                    type="submit"
                    className="h-10 w-full rounded-none bg-cyan-600 text-white hover:bg-cyan-700"
                  >
                    Create Account
                  </Button>
                </Field>

                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-white">
                  Or sign up with
                </FieldSeparator>

                <Field>
                  <Button
                    variant="outline"
                    type="button"
                    className="h-10 w-full rounded-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="size-4"
                    >
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="#4285F4"
                      />
                    </svg>
                    Sign Up With Google
                  </Button>
                </Field>

                <Field>
                  <FieldDescription className="text-center">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="font-medium text-cyan-600 hover:underline"
                    >
                      Login
                    </a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
