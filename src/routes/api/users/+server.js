// export const GET = async () => {
//     const users = [
//         { name: "Zain", age: 20 },
//         { name: "Mo", age: 21 }
//     ];

//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     const newResponse = new Response(
//         JSON.stringify({ status: true, data: { users } }), 
//         { 
//             status: 200, 
//             headers: { 'Content-Type': 'application/json' }
//         }
//     );

//     return newResponse;
// };