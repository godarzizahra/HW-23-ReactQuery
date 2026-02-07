import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUsers } from "../services/user-services";

export default function useDeleteUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteUsers(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
}
