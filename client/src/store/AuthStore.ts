import { AuthStotre } from "@/types/AuthStoreType";
import { create } from "zustand";

export const AuthStore = create<AuthStotre>((set) => ({
  token: null,
  isAuthenticated: false,
  login: (token) => {
    localStorage.setItem("token", token);
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ isAuthenticated: false });
  },
  hydrate: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ token, isAuthenticated: true });
    }
  },
}));
