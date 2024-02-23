import { connect, connection } from 'mongoose';

let connectionState = {
    isConnected: 0
}

export async function connectDB() {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
        throw new Error("MONGODB_URL environment variable is not set.");
    }

    if (connectionState.isConnected) return;

    let db = await connect(mongoUrl);
    connectionState.isConnected = db.connections[0].readyState;
}


connection.on('connected', () => {
    console.log('MongoDB connected');
})

connection.on('error', (error) => {
    console.log(`MongoDB error: ${error}`);
})