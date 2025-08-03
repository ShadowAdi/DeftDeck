"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MailCheck, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { handleVerifyUser } from "@/services/auth/verify-email/verify-email.service";

const VerifyEmail = () => {
  const search = useSearchParams();
  const token = search.get("token");
  const router = useRouter();
  useEffect(() => {
    if (token) {
      handleVerifyUser({ router, token });
    }
  }, [token]);

  return (
    <section className="flex-1 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <MailCheck className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-2xl mt-4 font-semibold">
            Check your email
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <p className="text-sm text-muted-foreground">
            We’ve sent a verification link to your email address. Please check
            your inbox and click on the link to verify your account.
          </p>

          <Button variant="default" className="w-full flex gap-2">
            <RotateCcw size={16} />
            Resend Email
          </Button>

          <Link
            href="/login"
            className="block text-sm text-muted-foreground hover:underline mt-2"
          >
            Go back to Login
          </Link>
        </CardContent>
      </Card>
    </section>
  );
};

export default VerifyEmail;
