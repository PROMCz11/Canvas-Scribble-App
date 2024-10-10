// export async function load({ fetch }) {
//     const res = await fetch('/api/users');
//     const json = await res.json();

//     if (!res.ok) {
//         return { status: res.status, error: new Error('Failed to load users') };
//     }

//     return {
//         users: json.data.users
//     };
// }