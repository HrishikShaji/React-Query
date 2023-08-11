"use client";
import { useUsers } from "@/hooks/useUsers";
import { useRouter } from "next/navigation";
import React from "react";
import { Toaster, toast } from "react-hot-toast";
import { useQuery } from "react-query";

type User = {
  id: string;
  name: string;
  email: string;
};

const page = () => {
  const { isLoading, data, isError, error, isFetching, refetch } = useUsers();

  const router = useRouter();
  console.log(data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h2>{(error as any).message}</h2>;
  }

  console.log(isLoading, isFetching);

  return (
    <>
      <Toaster />
      <div className="p-10 flex flex-col gap-4">
        <button onClick={() => refetch()}>Fetch Users</button>
        {data?.map((user: User) => (
          <div key={user.id}>
            <div
              onClick={() => router.push(`/users/${user.id}`)}
              className="flex w-full cursor-pointer justify-between text-left">
              <h1>{user.name}</h1>
              <h2>{user.email}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
