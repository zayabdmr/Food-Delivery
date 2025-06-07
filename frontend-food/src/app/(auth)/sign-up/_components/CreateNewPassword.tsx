"use client";

import React, { Dispatch, SetStateAction } from "react";
import { ChevronLeft } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { axiosInstance } from "@/lib/utils";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

interface CreateNewPasswordProps {
  setStep: Dispatch<SetStateAction<number>>;
}

export const CreateNewPassword = ({ setStep }: CreateNewPasswordProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await axiosInstance.post("/user/password", data);
      console.log("Password set successfully:", response.data);
    } catch (error) {
      console.error("Setting password failed:", error);
    }
  };
  const router = useRouter();

  return (
    <Card className="w-[407px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6"
        >
          <CardHeader>
            <Button
              type="button"
              className="bg-white border text-black w-9 h-9 p-0"
              onClick={() => setStep((prev) => prev - 1)}
            >
              <ChevronLeft size={16} />
            </Button>
            <CardTitle className="text-[20px] font-semibold">
              Create a Strong Password
            </CardTitle>
            <CardDescription>Use a mix of letters and numbers.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
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
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button className="w-full h-[44px]" type="submit">
              Let's Go
            </Button>
          </CardFooter>

          <div className="flex justify-center gap-3 text-[16px] w-full pb-6">
            <p className="text-[#71717A]">Already have an account?</p>
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
  );
};
