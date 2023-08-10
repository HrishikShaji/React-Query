"use client";
import React from "react";
import { useQuery } from "react-query";

const page = () => {
  const { isLoading, data, isError, error } = useQuery("users", async () => {
    return await fetch("/api/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h2>{(error as any).message}</h2>;
  }

  console.log(data);

  return (
    <div>
      {data?.map((user: any) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default page;
