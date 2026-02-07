import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putUsers } from "../services/user-services";

export default function useEditUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: putUsers,

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
}
