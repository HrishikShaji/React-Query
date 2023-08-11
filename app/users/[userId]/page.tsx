"use client";
import { useUser } from "@/hooks/useUser";
import { useParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import { useQuery } from "react-query";

const route = () => {
  const { userId } = useParams();
  const { data, isError, isLoading, isSuccess } = useUser(userId as string);

  const user = useQuery(
    ["User"],
    async () => {
      await fetch(`/api/users/${data.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
    },
    { enabled: !!data }
  );

  console.log(user);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-10">
      {isSuccess && (
        <div>
          <h1>{data.name}</h1>
          <Image
            src={data?.image}
            alt="profile image"
            height={100}
            width={100}
            className="h-20 w-20 object-cover rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default route;
