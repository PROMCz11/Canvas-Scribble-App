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
    const roomsObj = roomsData.data.rooms;
    const roomsArr = Object.keys(roomsObj).map(key => roomsObj[key]);
    const rooms = roomsArr;
    console.log(rooms);
    return {
        rooms
    };
}