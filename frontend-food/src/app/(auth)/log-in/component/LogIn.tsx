"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { axiosInstance } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password should be more than 8 letters" }),
});

export function LogIn() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    try {
      const response = await axiosInstance.post(
        "/auth",
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );

      const { message, success } = response.data;

      if (success) {
        router.push("/dashboard");
      } else {
        form.setError("email", { type: "manual", message });
        form.setError("password", { type: "manual", message });
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Login failed";
      form.setError("email", { type: "manual", message: errorMessage });
      form.setError("password", { type: "manual", message: errorMessage });
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-[407px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="flex flex-col gap-6"
          >
            <CardHeader>
              <Button
                type="button"
                className="bg-white border text-black w-9 h-9 p-0"
              >
                <ChevronLeft size={16} />
              </Button>
              <CardTitle className="text-[20px] font-semibold">
                Log in
              </CardTitle>
              <CardDescription className="text-[16px] text-[#71717A]">
                Log in to enjoy your favorite dishes.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full h-[44px]" type="submit">
                Let's Go
              </Button>
            </CardFooter>

            <div className="flex justify-center gap-3 text-[16px] w-full pb-6">
              <p className="text-[#71717A]">Don’t have an account?</p>
              <button
                type="button"
                className="text-[#2563EB] hover:underline"
                onClick={() => router.push("/sign-up")}
              >
                Sign up
              </button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
