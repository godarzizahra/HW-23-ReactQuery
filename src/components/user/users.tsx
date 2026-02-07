import useUsers from "../../hooks/useUsers";

export default function Users() {
	const { data, isLoading, error } = useUsers();
	if (isLoading) {
		return <div>Is Loading...</div>;
	}
	if (error) {
		return <div>{error}</div>;
	}
	console.log(data);
	return <div></div>;
}
