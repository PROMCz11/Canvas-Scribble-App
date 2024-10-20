// Redirect on error

export const load = async ({ cookies, fetch }) => {
    const authToken = cookies.get("authToken");
    const roomsRes = await fetch("https://canvas-scribble-app.onrender.com/api/room/getall", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    });
    const roomsData = await roomsRes.json();
    const rooms = roomsData.data.rooms;
    return {
        rooms
    };
}