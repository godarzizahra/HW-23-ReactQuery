import axios from "axios";
import { API_USER } from "../constants/baseUrl-user";

export async function getUsers() {
	const res = await axios.get(API_USER);
	return res.data;
}
