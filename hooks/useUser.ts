import { useQuery } from "react-query";

const fetchUser = async (userId: string) => {
  return await fetch(`/api/users/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());
};

export const useUser = (userId: string) => {
  return useQuery(["user", userId], () => fetchUser(userId));
};
