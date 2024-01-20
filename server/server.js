import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./DB/connectDB.js";

dotenv.config({
    path: "./env",
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server connected at port:- ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDb connection failed", err);
    });

const user = {
    _id: "someUserId",
    email: "user@example.com",
    username: "someUsername",
};

