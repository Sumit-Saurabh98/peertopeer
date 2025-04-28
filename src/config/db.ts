import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`Mongodb database connected to host ${conn.connection.host}`)
        
    } catch (error) {
        console.log(`Error while connecting to mongodb database ${error}`)
        process.exit(1);
    }
}

export default connectDB;