import { toast } from "react-hot-toast";
import { useQuery } from "react-query";

const fetchUsers = async () => {
  return await fetch("/api/users", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());
};

export const useUsers = () => {
  return useQuery("users", fetchUsers, {
    onSuccess: () => toast.success("users found"),
    onError: (error) => toast.error(error as any),
    select: (data) => {
      console.log(data);
      const names = data.map((name: any) => ({
        name: name.name,
        email: name.email,
        id: name.id,
      }));
      return names;
    },
  });
};
