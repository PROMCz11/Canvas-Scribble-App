import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies }) => {
    console.log(cookies.delete("authToken", { path: "/" }));
    throw redirect(302, "/");
}