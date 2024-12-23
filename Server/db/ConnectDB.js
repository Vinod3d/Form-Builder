import mongoose from "mongoose";

const connectDB = async (url) =>{
    try {
        await mongoose.connect(url);
        return console.log("CONNECTED TO THE DATABASE");
    } catch (error) {
        return console.log(error)
    }
}

export default connectDB;