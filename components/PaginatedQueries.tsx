"use client";
import React, { useState } from "react";
import { useQuery } from "react-query";

const fetchUsers = async (pageNumber: number) => {
  return await fetch(`/api/users?page=${pageNumber}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());
};

const PaginatedQueries = () => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const { data, isLoading } = useQuery(
    ["users", pageNumber],
    () => fetchUsers(pageNumber),
    {
      keepPreviousData: true,
    }
  );
  return (
    <>
      <div className="flex flex-col justify-center items-cetner p-10">
        {data?.map((user: any) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button
          className="px-3 py-2 bg-white text-black rounded-md"
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 0}>
          Prev Page
        </button>
        <button
          className="px-3 py-2 bg-white text-black rounded-md"
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}>
          Next Page
        </button>
      </div>
    </>
  );
};

export default PaginatedQueries;
