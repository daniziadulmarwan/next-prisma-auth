"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

type SignInSchema = z.infer<typeof signinSchema>;

function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signinSchema),
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit: SubmitHandler<SignInSchema> = async (data) => {
    const response = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl,
    });
    console.log(response);
  };

  return (
    <main className="w-screen h-screen grid place-items-center">
      <form
        className="w-1/3 space-y-4 border border-gray-200 shadow px-5 py-8 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
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

        <div>
          <button
            type="submit"
            className="bg-teal-300 w-full py-2 px-2 rounded-md text-white hover:bg-teal-400"
          >
            Submit
          </button>
        </div>

        <span className="mt-10 text-center block">
          Don't have account ? <a href="/sign-up">Sign up</a>
        </span>
      </form>
    </main>
  );
}

export default page;
