import { useEffect, useState } from "react";
import { userSchema } from "../../constants/userSchemaValidation";
import useCreateUser from "../../hooks/useCreateUser";
import type { propsType } from "../../types/propstype";

export default function AddUser({ onClose }: propsType) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const [nameError, setNameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [touched, setTouched] = useState({ name: false, email: false });

	const { mutate, isPending } = useCreateUser();
	useEffect(() => {
		const result = userSchema.safeParse({ name, email });
		if (!result.success) {
			const errors = result.error.flatten().fieldErrors;
			setNameError(errors.name?.[0] || "");
			setEmailError(errors.email?.[0] || "");
		} else {
			setNameError("");
			setEmailError("");
		}
	}, [name, email]);
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const result = userSchema.safeParse({ name, email });
		if (!result.success) return;
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
						onChange={(e) => {
							setName(e.target.value);
							setTouched((prev) => ({ ...prev, name: true }));
						}}
						className={`border rounded px-3 py-2 ${
							touched.name && nameError ? "border-red-500" : ""
						}`}
					/>
					{nameError && touched.name && (
						<p className="text-red-500 text-sm">{nameError}</p>
					)}
					<input
						type="text"
						placeholder="Email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							setTouched((prev) => ({ ...prev, email: true }));
						}}
						className={`border rounded px-3 py-2 ${
							touched.email && emailError ? "border-red-500" : ""
						}`}
					/>
					{emailError && touched.email && (
						<p className="text-red-500 text-sm">{emailError}</p>
					)}
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
