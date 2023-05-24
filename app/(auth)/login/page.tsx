"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const LoginPage = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  return (
    <div className="flex items-center justify-center min-h-full px-4">
      <div className="w-full max-w-xl bg-white px-8 py-24 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center justify-center gap-y-8">
          <div className="relative w-full h-28">
            <Image src="/images/logo.png" alt="logo" fill priority />
          </div>
          <h2 className="text-xl text-black/70  font-semibold text-center">
            Welcome to Prodyna Events
          </h2>
          <button
            className="link link-hover flex items-center gap-2 text-neutral-500"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            Continue with{" "}
            <FcGoogle className="inline-block align-middle" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
