// Server-Side Initialization: This step initializes Pusher on the server side, 
// allowing your Next.js backend to trigger events and interact with Pusher’s APIs.

import PusherServer from 'pusher';

let pusherInstance: PusherServer | null = null;
export const getPusherInstance = () => {
  if (!pusherInstance) {
    pusherInstance = new PusherServer({
      appId: process.env.PUSHER_APP_ID as string,
      key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
      secret: process.env.PUSHER_SECRET as string,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
      useTLS: true,
    });
  }
  return pusherInstance;
};