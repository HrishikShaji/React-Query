"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/auth");
    }
  });
  return (
    <main className="flex h-screen w-full justify-center items-center flex-col gap-4">
      <h1>Logged in </h1>
      <button
        onClick={() => signOut()}
        className="px-3 py-2 rounded-md bg-white text-black font-semibold">
        Log Out
      </button>
    </main>
  );
}
