import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

const connectDB = async() => {
    try {
        const Connection = await mongoose.connect(
            `${process.env.MONGODB_URL}/${DB_NAME}`
        );
        console.log(`MongoDb connected at :- ${Connection.connection.host}`);
    } catch (error) {
        console.log(",MongoDb connection Error", error);
        process.exit(1);
    }
};

export default connectDB;
