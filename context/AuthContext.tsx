
import { createContext } from "react";

export interface UserType {
  name: string;
  email: string;
  picture: string;
  _id? : string; // optional if set later by backend
  orderId? : string;
  credits? : number;
}

interface AuthContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});
