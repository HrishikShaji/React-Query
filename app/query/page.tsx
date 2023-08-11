"use client";
import { fetchUser } from "@/hooks/useUser";
import { useUsers } from "@/hooks/useUsers";
import { useRouter } from "next/navigation";
import React from "react";
import { Toaster, toast } from "react-hot-toast";
import { useQueries, useQuery } from "react-query";

type User = {
  id: string;
  name: string;
  email: string;
};

const page = () => {
  const { isLoading, data, isError, error, isFetching, refetch } = useUsers();

  const userResults = useQueries(
    data?.map((user: User) => {
      return {
        queryKey: ["user", user.id],
        queryFn: () => fetchUser(user.id),
      };
    }) || []
  );
  const router = useRouter();
  console.log(userResults);

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
