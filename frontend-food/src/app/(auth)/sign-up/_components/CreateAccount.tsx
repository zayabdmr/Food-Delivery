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

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

interface CreateAccountProps {
  setStep: Dispatch<SetStateAction<number>>;
}

export const CreateAccount = ({ setStep }: CreateAccountProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await axiosInstance.post("/user", data);
      console.log("Registration success:", response.data);

      setStep((prev) => prev + 1);
    } catch (error) {
      console.error("Registration failed:", error);
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
              Create Your Account
            </CardTitle>
            <CardDescription>
              Sign up to explore your favorite dishes.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
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
