import { useState } from "react";
import useEditUser from "../../hooks/useEditUser";
import type { propsEditType } from "../../types/propstype";

export default function EditUser({ onClose, user }: propsEditType) {
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const { mutate, isPending } = useEditUser();
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (name.trim() && email.trim()) {
			mutate(
				{ id: user.id, name, email },
				{
					onSuccess: () => {
						onClose();
					},
				},
			);
		}
	};

	return (
		<div
			className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
			onClick={onClose}
		>
			<div
				className="flex flex-col items-center bg-amber-50 p-10 rounded-xl"
				onClick={(e) => e.stopPropagation()}
			>
				<h1 className="text-4xl font-bold pl-2">Edit User </h1>
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
						Save
					</button>
				</form>
			</div>
		</div>
	);
}
