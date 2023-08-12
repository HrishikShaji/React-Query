"use client";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  QueryObserverResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

type Post = {
  body: string;
  userId: string;
};

const addPost = async (post: Post) => {
  return await fetch("/api/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
};

const page = () => {
  const session = useSession();
  const [body, setBody] = useState<string>("");

  const queryClient = useQueryClient();
  const { mutate } = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const post: Post = {
        userId: session?.data?.user as string,
        body: body,
      };
      console.log(body);
      mutate(post);

      toast.success("Post added");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery(["posts"], async () => {
    return await fetch("/api/post", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  });

  return (
    <>
      <Toaster />
      <div className="h-min-screen w-full flex flex-col gap-10 justify-center items-center p-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 justify-center items-center h-full w-full">
          <textarea
            value={body}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setBody(e.target.value)
            }
            className="p-5 rounded-lg text-black"
          />
          <button className="px-3 py-2 bg-white text-black rounded-md font-semibold">
            Post
          </button>
        </form>

        <div className="grid grid-cols-4 gap-4">
          {isLoading && <h1>Loading...</h1>}
          {isSuccess &&
            data.map((post: any, i: number) => (
              <div key={i} className="p-5 bg-gray-500 rounded-md ">
                <h1>{post.body}</h1>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default page;
