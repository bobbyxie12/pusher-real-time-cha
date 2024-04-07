
// import { NextResponse,NextRequest } from 'next/server'
// import {WebSocketCollection} from '@db/db'


// export async function POST(req: NextRequest) {
//     try {
 
//         const body = await req.json();
//         const messageContent = body.message || "test"; 

//         // Trigger a Pusher event
//         await pusherServer.trigger('private-chat', "evt::test", {
//             message: messageContent,
//             user: "Bobby",
//             date: new Date(),
//         });

//         // Connect to the database and insert the message

//         await WebSocketCollection.insertOne({
//             message: messageContent,
//             username: "Bobby",  
//             date: new Date(),
//         });

//         return NextResponse.json({ message: "Sockets tested and message saved" }, { status: 200 });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ message: "Failed to test sockets or save message", error: error}, { status: 500 });
//     }
// }