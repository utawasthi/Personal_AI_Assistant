"use client"

import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/AuthContext';
import { api } from '@/convex/_generated/api';
import { GetAuthUserData } from '@/services/GlobalApi';
import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import Image from 'next/image';

function SignIn() {
  const router = useRouter();
  const CreateUser = useMutation(api.users.CreateUser);
  const { user, setUser } = useContext(AuthContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (typeof window !== undefined) {
        localStorage.setItem('user_token', tokenResponse.access_token);
      }

      const user = await GetAuthUserData(tokenResponse.access_token);
      const result = await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
      });

      setUser(result);
      router.replace('/ai-assistants');
    },
    onError: errorResponse => console.error(errorResponse),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#0a0f0f] transition-colors">
      <div className="w-full max-w-sm p-8 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl shadow-md backdrop-blur-md">
        <div className="flex flex-col items-center justify-center gap-6">
          <Image
            src="/logo.svg"
            alt="Orbit Mind Logo"
            width={80}
            height={80}
            className="dark:invert"
          />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-cyan-300 text-center">
            Sign In to Orbit Mind
          </h2>

          <Button
            className="w-full bg-black text-white dark:bg-cyan-400 dark:text-black hover:bg-gray-900 dark:hover:bg-cyan-500 transition"
            onClick={() => googleLogin()}
          >
            Sign In with GMail
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;