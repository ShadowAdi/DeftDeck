export interface AuthStotre {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  hydrate: () => void;
}

