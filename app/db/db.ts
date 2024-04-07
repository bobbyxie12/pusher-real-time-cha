import {MongoClient} from 'mongodb'
export const client = new MongoClient('mongodb://0.0.0.0:27017')
export interface WebSocket {
    userId?: string;
    username?: string; 
    message?: string; 
    date?: Date; 
    conversationId?: number; 
    status?: 'sent' | 'delivered' | 'read'; 
  }
  
export const WebSocketCollection = client
.db("CrazyApp")
.collection<WebSocket>("WebSocketCollection");