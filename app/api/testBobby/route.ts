// Creating a Test Route: This route is crucial for testing server-to-client communication via Pusher. 
// It simulates a server-side event trigger, allowing you to verify real-time updates on the client side.

import { NextResponse,NextRequest } from 'next/server'
import { getPusherInstance } from "../../lib/pusher/server";
import {WebSocketCollection} from '@db/db'
const pusherServer = getPusherInstance();

export async function POST(req: NextRequest) {
    try {
 
        const body = await req.json();
        const messageContent = body.message || "test"; 

        // Trigger a Pusher event
        await pusherServer.trigger('private-chat', "evt::test", {
            message: messageContent,
            user: "Bobby",
            date: new Date(),
            conversationId:1
        });

        // Connect to the database and insert the message

        await WebSocketCollection.insertOne({
            message: messageContent,
            username: "Bobby",  
            date: new Date(),
            conversationId:1
        });

        return NextResponse.json({ message: "Sockets tested and message saved" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to test sockets or save message", error: error}, { status: 500 });
    }
}