import axios from "axios";
import { API_USER } from "../constants/baseUrl-user";
import type { Usertype } from "../types/usertype";

export async function getUsers() {
	const res = await axios.get(API_USER);
	return res.data;
}

export async function addUsers(user: Usertype) {
	const res = await axios.post(API_USER, user);
	return res.data;
}
