import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies, fetch }) => {
    const authToken = cookies.get("authToken");
    if(!authToken) {
        if(cookies.get("registeredUser")) {
            throw redirect(302, "login");
        }

        else {
            throw redirect(302, "signup");
        }
    }
    const roomsRes = await fetch("https://canvas-scribble-app.onrender.com/api/room/getall", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    });
    const roomsData = await roomsRes.json();
    if(!roomsData.status) {
        console.log(roomsData.message);
        if(cookies.get("registeredUser")) {
            throw redirect(302, "login");
        }

        else {
            throw redirect(302, "signup");
        }
    }
    const roomsObj = roomsData.data.rooms;
    const roomsArr = Object.keys(roomsObj).map(key => roomsObj[key]);
    const rooms = roomsArr;
    return {
        rooms
    };
}