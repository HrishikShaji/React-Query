"use client";
import { useUser } from "@/hooks/useUser";
import { useParams } from "next/navigation";
import React from "react";
import Image from "next/image";

const route = () => {
  const { userId } = useParams();
  const { data, isError, isLoading, isSuccess } = useUser(userId as string);

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
