import { connect, connection } from 'mongoose';

let connectionState = {
    isConnected: 0
}

export async function connectDB() {
    if (connectionState.isConnected) return
    let db = await connect('mongodb://localhost/nextmongocrud')
    connectionState.isConnected = db.connections[0].readyState
}

connection.on('connected', () => {
    console.log('MongoDB connected');
})

connection.on('error', (error) => {
    console.log(`MongoDB error: ${error}`);
})