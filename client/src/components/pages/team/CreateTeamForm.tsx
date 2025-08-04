"use client";
import ImageInput from "@/components/shared/ImageInput";
import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import { CreateTeamFormData } from "@/schemas/teamSchema/teamSchema";
import { CreateTeam } from "@/services/teams/team.service";
import { AuthStore } from "@/store/AuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const CreateTeamForm = () => {
  const router = useRouter();
  const { isAuthenticated, token } = AuthStore();
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const form = useForm<z.infer<typeof CreateTeamFormData>>({
    resolver: zodResolver(CreateTeamFormData),
    defaultValues: {
      teamName: "",
      teamDescription: "",
      teamImage: "",
      teamTags: [],
    },
  });

  const watchImage = form.watch("teamImage");

  async function onSubmit(values: z.infer<typeof CreateTeamFormData>) {
    if (!isAuthenticated || !token) {
      router.push("/login");
      return;
    }

    const finalValues = {
      ...values,
      teamTags: tags,
    };

    await CreateTeam({ values: finalValues, router, token });
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = currentTag.trim();
      if (newTag && !tags.includes(currentTag)) {
        setTags([...tags, newTag]);
        setCurrentTag("");
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full flex flex-col items-center justify-center"
        >
          <FormField
            control={form.control}
            name="teamName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Team Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter team name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="teamDescription"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Team Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter team description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="teamImage"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Team Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter image URL" type="url" {...field} />
                </FormControl>
                {watchImage && (
                  <ImageInput
                    imageUrl={watchImage}
                    imagePreview="input image"
                    className="max-h-40"
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="teamTags"
            render={() => {
              return (
                <FormItem className="w-full ">
                  <FormLabel>Team Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Tag And Press Enter"
                      type="text"
                      onKeyDown={handleKeyDown}
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.currentTarget.value)}
                    />
                  </FormControl>
                  <div className="flex flex-row gap-3 flex-wrap  items-center w-full">
                    {tags.map((tag, i) => (
                      <Badge
                        className="rounded-full text-sm flex items-center px-3 py-2"
                        key={i}
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => {
                            const updated = tags.filter(
                              (_, index) => index !== i
                            );
                            setTags(updated);
                            form.setValue("teamTags", updated);
                          }}
                        >
                          <X className="h-5 w-5 ml-1 cursor-pointer" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit" className="mx-auto w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateTeamForm;
