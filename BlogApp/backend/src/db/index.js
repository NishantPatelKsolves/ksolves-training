import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async ()=>{
    try {
        const connInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`Mongo DB Successfully Connected hua`);
        console.log(`Complete connection instance: ${connInstance}`);
        console.log(`DB host: ${connInstance.connection.host}`)
        
    } catch (error) {
        console.log(`Mongo DB connection error hua: ${error}`);
        process.exit(1); // do not proceed if DB not connected
    }
}

export default connectDB;