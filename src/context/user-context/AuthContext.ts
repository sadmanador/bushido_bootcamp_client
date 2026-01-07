import { User, UserCredential } from "firebase/auth";
import { createContext } from "react";

export interface AuthInfo {
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  updateUser: (userInfo: { displayName?: string | null; photoURL?: string | null }) => Promise<void>;
  logOut: () => Promise<void>;
  googleSignIn: () => Promise<UserCredential>;
  loading: boolean;
  user: User | null;
}

export const AuthContext = createContext<AuthInfo | null>(null);
