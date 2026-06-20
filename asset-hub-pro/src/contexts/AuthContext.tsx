import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { jwtDecode } from "jwt-decode";
import { loginUser } from "@/api/authApi";

export type UserRole =
  | "ADMIN"
  | "IT_STAFF"
  | "EMPLOYEE";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface JwtPayload {
  sub: string;
  role: string;
  exp: number;
  iat: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    username: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext =
  createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return ctx;
};

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {
    const savedUser =
      localStorage.getItem("itams_user");

    const token =
      localStorage.getItem("token");

    if (!savedUser || !token) {
      return;
    }

    try {
      const decoded =
        jwtDecode<JwtPayload>(token);

      const isExpired =
        decoded.exp * 1000 < Date.now();

      if (isExpired) {
        logout();
        return;
      }

      setUser(JSON.parse(savedUser));
    } catch {
      logout();
    }
  }, []);

  const login = async (
    username: string,
    password: string
  ) => {
    const response = await loginUser({
      username,
      password,
    });

    const token = response.data.token;

    const decoded =
      jwtDecode<JwtPayload>(token);

    const role = decoded.role.replace(
      "ROLE_",
      ""
    ) as UserRole;

    const userData: User = {
      id: decoded.sub,
      name: decoded.sub,
      email: decoded.sub,
      role,
    };

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "itams_user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("itams_user");

    setUser(null);
  };

  const hasRole = (
    roles: UserRole[]
  ) => {
    return !!user &&
      roles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};