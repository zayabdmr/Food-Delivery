"use client";

import React, { Dispatch, SetStateAction } from "react";
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email. Use a format like example@email.com" }),
});

interface CreateAccountProps {
  setStep: Dispatch<SetStateAction<number>>;
}

export const SignUpEmail = ({ setStep }: CreateAccountProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await axiosInstance.post("/user", data);

      if (response.status === 200 || response.status === 201) {
        console.log("Registration success:", response.data);
        setStep((prev) => prev + 1);
      } else {
        console.error("Unexpected response:", response.status);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex justify-center mt-20 px-4 w-full">
      <Card className="w-[350px] shadow-none border-none bg-transparent">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-6"
          >
            <CardHeader className="p-0 mb-2">
              <Button
                type="button"
                className="bg-white border text-black w-9 h-9 p-0 mb-2"
              >
                <ChevronLeft size={16} />
              </Button>
              <CardTitle className="text-[22px] font-semibold">
                Create Your Account
              </CardTitle>
              <CardDescription className="text-[15px] text-muted-foreground">
                Sign up to explore your favorite dishes.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
