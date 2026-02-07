import { useState } from "react";
import useCreateUser from "../../hooks/useCreateUser";

type props = {
	onClose: () => void;
};
export default function AddUser({ onClose }: props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const { mutate, isPending } = useCreateUser();
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (name.trim() && email.trim()) {
			mutate(
				{ name, email },
				{
					onSuccess: () => {
						onClose();
					},
				},
			);
			// setName("");
			// setEmail("");
		}
	};
	return (
		<div
			className="fixed inset-0 bg-black/85 flex items-center justify-center z-50"
			onClick={onClose}
		>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-3 bg-amber-50 p-20 rounded-xl"
				onClick={(e) => e.stopPropagation()}
			>
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="border rounded px-3 py-2"
				/>

				<input
					type="text"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="border rounded px-3 py-2"
				/>
				<button
					type="submit"
					className="bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
					disabled={isPending}
				>
					Submit
				</button>
			</form>
		</div>
	);
}
