"use client";
import PaginatedQueries from "@/components/PaginatedQueries";
import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";

const fetchUsers = async ({ pageParam = 1 }) => {
  return await fetch(`/api/users?page=${pageParam}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());
};

const page = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(["users"], fetchUsers, {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 4) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);
  return (
    <div className="min-h-screen w-full flex flex-col gap-10  p-10">
      {data?.pages.map((group: any, i: number) => (
        <div key={i} className="">
          {group.map((user: any, i: number) => (
            <div key={i} className="h-[500px] bg-gray-500 w-full rounded-md">
              <h1>{user.name}</h1>
            </div>
          ))}
        </div>
      ))}
      <button ref={ref}>Load More</button>
    </div>
  );
};

export default page;
