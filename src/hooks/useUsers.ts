import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/user-services";
import type { Usertype } from "../types/usertype";

export default function useUsers() {
	const { data, isLoading, error } = useQuery<Usertype[]>({
		queryKey: ["users"],
		queryFn: getUsers,
	});
	return { isLoading, data, error: error ? "fail to fetch" : "" };
}
