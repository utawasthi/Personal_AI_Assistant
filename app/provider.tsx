"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { AuthContext, UserType } from "@/context/AuthContext";
import { GetAuthUserData } from "@/services/GlobalApi";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

const Provider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<UserType | null>(null);
  const [loadingUser , setLoadingUser] = useState<boolean>(true);


  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  const router = useRouter();

  useEffect(() => {
    if(!user && !loadingUser) router.push('/sign-in');
  } , [user , loadingUser]);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("user_token");
      if (!token){
        setLoadingUser(false);
        return;
      }

      try {
        // 1. Get user info from Google
        const googleUser = await GetAuthUserData(token);

        // 2. Fetch user from Convex
        const userFromConvex = await convex.query(api.users.GetUser, {
          email: googleUser.email,
        });

        // 3. Set user only if different
        if (userFromConvex) {
          setUser((prev) => {
            if (prev?._id === userFromConvex._id) return prev;
            return userFromConvex;
          });
        } else {
          // 4. Create and set if not found
          const created = await convex.mutation(api.users.CreateUser, {
            name: googleUser.name,
            email: googleUser.email,
            picture: googleUser.picture,
          });
          setUser((prev) => {
            if (prev?.email === created.email) return prev;
            return created;
          });
        }
      } catch (error) {
        console.error("Failed to restore user:", error);
        setUser(null);
        router.push('/sign-in');
      }
      finally{
        setLoadingUser(false);
      }
    };

    loadUser();
  }, [convex]);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <ConvexProvider client={convex}>
        <AuthContext.Provider value={{ user, setUser }}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </NextThemesProvider>
        </AuthContext.Provider>
      </ConvexProvider>
    </GoogleOAuthProvider>
  );
};

export default Provider;