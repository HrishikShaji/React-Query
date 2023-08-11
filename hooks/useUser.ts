import { useQuery, useQueryClient } from "react-query";

export const fetchUser = async (userId: string) => {
  return await fetch(`/api/users/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());
};

export const useUser = (userId: string) => {
  const queryClient = useQueryClient();
  return useQuery(["user", userId], () => fetchUser(userId), {
    initialData: () => {
      const users = queryClient.getQueryData("users") as unknown;

      if (Array.isArray(users)) {
        const user = users.find((user) => user.id === parseInt(userId));
        if (user) {
          return {
            data: user,
          };
        }
      } else {
        return undefined;
      }
    },
  });
};
