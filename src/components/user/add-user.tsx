import { useState } from "react";
import useCreateUser from "../../hooks/useCreateUser";
import type { propsType } from "../../types/propstype";

export default function AddUser({ onClose }: propsType) {
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
			className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
			onClick={onClose}
		>
			<div
				className="flex flex-col items-center bg-amber-50 p-10 rounded-xl"
				onClick={(e) => e.stopPropagation()}
			>
				<h1 className="text-4xl font-bold pl-2">Add User </h1>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-5 bg-amber-50 p-15 rounded-xl"
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
						Add
					</button>
				</form>
			</div>
		</div>
	);
}
