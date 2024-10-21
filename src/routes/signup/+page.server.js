import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies }) => {
    const authToken = cookies.get("authToken");
    if(authToken) {
        throw redirect(303, "lobby");
    }
}