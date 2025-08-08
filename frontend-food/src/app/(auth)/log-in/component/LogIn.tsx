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
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    try {
      const { data } = await axiosInstance.post("/auth", values, {
        withCredentials: true,
      });
      data.success ? router.push("/dashboard") : showError(data.message);
    } catch (err: any) {
      showError(err?.response?.data?.message || "Login failed");
    }
  };

  const showError = (message: string) => {
    form.setError("email", { type: "manual", message });
    form.setError("password", { type: "manual", message });
  };

  return (
    <div className="flex justify-center mt-20 px-4 w-full">
      <Card className="w-[350px] bg-transparent border-none shadow-none">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="flex flex-col gap-6"
          >
            <CardHeader className="p-0 mb-2">
              <Button
                type="button"
                className="bg-white border text-black w-9 h-9 p-0 mb-2"
                onClick={() => router.back()}
              >
                <ChevronLeft size={16} />
              </Button>
              <CardTitle className="text-[22px] font-semibold">
                Log in
              </CardTitle>
              <CardDescription className="text-[15px] text-muted-foreground">
                Log in to enjoy your favorite dishes.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 p-0">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
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
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <p
              className="underline text-sm text-primary cursor-pointer"
              onClick={() => router.push("/forget-password")}
            >
              Forgot password?
            </p>

            <CardFooter className="flex flex-col gap-4 p-0">
              <Button className="w-full h-11" type="submit">
                Let’s Go
              </Button>
            </CardFooter>

            <div className="flex justify-center gap-2 text-sm text-muted-foreground pb-6">
              <span>Don’t have an account?</span>
              <button
                type="button"
                className="hover:underline text-primary"
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
