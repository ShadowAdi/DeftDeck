"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { LoginFormData } from "@/schemas/authSchema/authSchema";
import { handleLoginUser } from "@/services/auth/login/login.service";
import { EyeClosed, EyeIcon } from "lucide-react";
import { AuthStore } from "@/store/AuthStore";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof LoginFormData>>({
    resolver: zodResolver(LoginFormData),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = AuthStore();

  async function onSubmit(values: z.infer<typeof LoginFormData>) {
    await handleLoginUser({ values, router, login });
  }
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full flex flex-col items-center justify-center"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="*****"
                      type={showPassword ? "password" : "text"}
                      {...field}
                    />
                    {!showPassword ? (
                      <EyeIcon
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black-500 cursor-pointer"
                        onClick={() => setShowPassword(true)}
                      />
                    ) : (
                      <EyeClosed
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black-500 cursor-pointer"
                        onClick={() => setShowPassword(false)}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
