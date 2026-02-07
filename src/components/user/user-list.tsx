import { useState } from "react";
import useDeleteUser from "../../hooks/usedelete";
import useUsers from "../../hooks/useUsers";

import AddUser from "./add-user";

export default function UserList() {
	const [isopen, setIsOpen] = useState(false);
	const { data, isLoading, error } = useUsers();
	const { mutate } = useDeleteUser();
	const handleDelete = (id: string) => {
		mutate(id);
	};
	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64 text-gray-500 text-lg font-medium">
				Is Loading...
			</div>
		);
	}
	if (error) {
		return (
			<div className="flex justify-center items-center h-64 text-red-500 text-lg font-medium">
				{error}
			</div>
		);
	}
	if (!data || data.length === 0) {
		return (
			<div className="flex justify-center items-center h-64 text-gray-400 text-lg font-medium">
				NO Users found
			</div>
		);
	}

	return (
		<div className="w-full px-15 py-5 flex flex-col gap-3">
			<h1 className="text-4xl font-bold pl-2">User list</h1>
			<button
				onClick={() => setIsOpen(true)}
				className="
  bg-green-500 
  hover:bg-green-600 
  text-white 
  text-center
  font-bold 
  text-xl 
  w-10 
  h-10 
  rounded-2xl 
  flex 
  items-center 
  justify-center 
  shadow-md 
  absolute
  top-6
  right-30
"
			>
				+
			</button>
			{isopen && <AddUser onClose={() => setIsOpen(false)} />}
			<table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
				<thead className="bg-gray-100">
					<tr>
						<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
							ID
						</th>
						<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
							Name
						</th>
						<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
							Email
						</th>
						<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700"></th>
					</tr>
				</thead>

				<tbody className="divide-y divide-gray-200">
					{data?.map((user) => (
						<tr key={user.id} className="hover:bg-gray-50 transition">
							<td className="px-4 py-3 text-sm text-gray-800">{user.id}</td>
							<td className="px-4 py-3 text-sm text-gray-800">{user.name}</td>
							<td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
							<button onClick={() => handleDelete(user.id)} className="pt-2">
								🗑️
							</button>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
