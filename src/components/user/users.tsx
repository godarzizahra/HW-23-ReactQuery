import useUsers from "../../hooks/useUsers";

export default function Users() {
	const { data, isLoading, error } = useUsers();
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
		<div className="w-full p-15 flex flex-col gap-3">
			<button
				// onClick={}
				className="
  bg-green-500 
  hover:bg-green-600 
  text-white 
  text-center
  font-bold 
  text-xl 
  w-12 
  h-12 
  rounded-full 
  flex 
  items-center 
  justify-center 
  shadow-md 
  absolute
  top-2
  right-16
"
			>
				+
			</button>
			<table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
				<thead className="bg-gray-100">
					<tr>
						<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
							Name
						</th>
						<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
							Email
						</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-gray-200">
					{data?.map((user) => (
						<tr key={user.id} className="hover:bg-gray-50 transition">
							<td className="px-4 py-3 text-sm text-gray-800">{user.name}</td>
							<td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
