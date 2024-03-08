import { Api } from "../../services/api";
import { IUser } from "./types";

export async function LoginRequest(email: string, password: string) {
	try {
		const request = await Api.post("auth", { email, password });

		return request.data;
	} catch (error) {
		return null;
	}
}
