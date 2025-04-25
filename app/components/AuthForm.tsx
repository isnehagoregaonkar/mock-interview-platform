"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import FormField from "./ui/FormField";

const authFormSchema = (type: string) =>
  z.object({
    name:
      type === "sign-up"
        ? z.string().min(1, "Name is required")
        : z.string().optional(),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const isSignIn = type === "sign-in";
  const formSchema = authFormSchema(type);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      if (isSignIn) {
        toast.success("Sign In successful");
        router.push("/");
        console.log("values", values);
      } else {
        toast.success("Account created successfully, Please Sign In");
        router.push("/sign-in");
        console.log("values", values);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error occurred: ${error}`);
    }
  }
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10 items-center">
        <div className="flex flex-row gap-2 justify-center">
          <Image src={"/logo.svg"} alt="logo" width={32} height={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3>Practice job interview with AI</h3>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 mt-4 form"
        >
          {!isSignIn && (
            <FormField
              control={form.control}
              name="name"
              label="Username"
              placeholder="Enter Username"
              type="text"
            />
          )}
          <FormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter Email"
            type="email"
          />
          <FormField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter Password"
            type="password"
          />
          <Button className="btn" type="submit">
            {isSignIn ? "Sign In" : "Create an Account"}
          </Button>
        </form>
      </Form>
      <p className="text-center py-2">
        {isSignIn ? "No Account yet?" : "Have an account already?"}
        <Link
          href={!isSignIn ? "/sign-in" : "/sign-up"}
          className="text-primary font-bold m-1"
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
