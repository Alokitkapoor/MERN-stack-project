import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const connectDB = async() => {
    try{
        await mongoose.connect(`${process.env.DB_STRING}/algodb`);
        console.log("database is connected successfully");
    }catch(err){
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    }
}

export default connectDB;
