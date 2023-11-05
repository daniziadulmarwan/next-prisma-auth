"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const signUpSchema = z
  .object({
    fullname: z.string().min(1, { message: "Fullname is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Must be valid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

type SignInSchema = z.infer<typeof signUpSchema>;

function Signup() {
  const [errorAlert, setErrorAlert] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignInSchema> = async (data) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "post",
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.message !== "success") {
        setErrorAlert(result.message);
      } else {
        router.push("/sign-in");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <main className="w-screen h-screen grid place-items-center">
      <form
        className="w-1/3 space-y-4 border border-gray-200 shadow px-5 py-8 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errorAlert && (
          <span className="text-center inline-block w-full rounded-md py-2 bg-red-100 text-red-500">
            {errorAlert}
          </span>
        )}
        <div className="flex flex-col">
          <label htmlFor="fullname">Fullname</label>
          <input
            id="fullname"
            type="text"
            className={`border py-2 px-3 rounded-md focus:outline-none ${
              errors.email ? "border-red-300" : "border-gray-200"
            }`}
            {...register("fullname")}
          />
          {errors.fullname && (
            <small className="text-red-500 mt-1">
              {errors.fullname.message}
            </small>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className={`border py-2 px-3 rounded-md focus:outline-none ${
              errors.email ? "border-red-300" : "border-gray-200"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <small className="text-red-500 mt-1">{errors.email.message}</small>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className={`border py-2 px-3 rounded-md focus:outline-none ${
              errors.password ? "border-red-300" : "border-gray-200"
            }`}
            {...register("password")}
          />
          {errors.password && (
            <small className="text-red-500 mt-1">
              {errors.password.message}
            </small>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            id="confirm_password"
            type="password"
            className={`border py-2 px-3 rounded-md focus:outline-none ${
              errors.confirmPassword ? "border-red-300" : "border-gray-200"
            }`}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <small className="text-red-500 mt-1">
              {errors.confirmPassword?.message}
            </small>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="bg-teal-300 w-full py-2 px-2 rounded-md text-white hover:bg-teal-400"
          >
            Submit
          </button>
        </div>

        <span className="mt-10 text-center block">
          Have an account ? <Link href="/sign-in">Sign in</Link>
        </span>
      </form>
    </main>
  );
}

export default Signup;
