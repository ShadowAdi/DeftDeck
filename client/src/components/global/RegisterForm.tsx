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
import { RegisterFormData } from "@/schemas/authSchema/authSchema";
import { handleRegisterUser } from "@/services/register/register.service";
import { EyeClosed, EyeIcon } from "lucide-react";

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof RegisterFormData>>({
    resolver: zodResolver(RegisterFormData),
    defaultValues: {
      companyName: "",
      email: "",
      name: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterFormData>) {
    await handleRegisterUser({ values, router });
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
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Aditya" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <div className="flex flex-col md:flex-row md:space-y-0 space-y-4 md:space-x-5 md:items-center w-full">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
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
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Google" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="mx-auto">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
