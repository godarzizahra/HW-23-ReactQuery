import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUsers } from "../services/user-services";

export default function useCreateUser() {
	const queryClient = useQueryClient();
	const mutation = useMutation<any, Error, { name: string; email: string }>({
		mutationFn: addUsers,

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});

	return mutation;
}
