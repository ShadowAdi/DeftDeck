"use client";
import { AuthStore } from "@/store/AuthStore";
import { useEffect } from "react";

const AuthHydrator = () => {
  useEffect(() => {
    AuthStore.getState().hydrate();
  }, []);

  return null;
};

export default AuthHydrator;
