"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";

import { axiosInstance } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .refine((val) => /[a-z]/.test(val), {
        message: "Must include at least one lowercase letter",
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Must include at least one uppercase letter",
      })
      .refine((val) => /\d/.test(val), {
        message: "Must include at least one number",
      })
      .refine((val) => /[^A-Za-z0-9]/.test(val), {
        message: "Must include at least one symbol",
      }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Those passwords didn’t match. Try again.",
    path: ["confirm"],
  });

interface SignUpPasswordProps {
  setStep: Dispatch<SetStateAction<number>>;
}

export const SignUpPassword = ({ setStep }: SignUpPasswordProps) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await axiosInstance.post("/user/password", data);
      console.log("Password set successfully:", res.data);
    } catch (error) {
      console.error("Setting password failed:", error);
    }
  };

  return (
    <div className="flex justify-center mt-24 px-4 w-full">
      <Card className="w-[350px] shadow-none border-none bg-transparent">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-6"
          >
            <CardHeader className="p-0 mb-2">
              <Button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="bg-white border text-black w-9 h-9 p-0 mb-2"
              >
                <ChevronLeft size={16} />
              </Button>
              <CardTitle className="text-[22px] font-semibold">
                Create a strong password
              </CardTitle>
              <CardDescription className="text-[15px] text-muted-foreground">
                Your password should include uppercase, lowercase, number and
                symbol.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-2 mt-1">
                <input
                  id="show-password"
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="w-4 h-4 border rounded"
                />
                <label htmlFor="show-password" className="text-sm">
                  Show password
                </label>
              </div>
            </CardContent>

            <CardFooter className="p-0">
              <Button type="submit" className="w-full h-11">
                Let's Go
              </Button>
            </CardFooter>

            <div className="flex justify-center gap-2 text-sm text-muted-foreground pb-6">
              <p>Already have an account?</p>
              <button
                type="button"
                className="text-[#2563EB] hover:underline"
                onClick={() => router.push("/log-in")}
              >
                Log in
              </button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};
