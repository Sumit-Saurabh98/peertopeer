import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {createServer} from "http"
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
dotenv.config();
import userRoutes from './routes/user.js'
import { initializeSocket } from './socket/index.js';


const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 5002

initializeSocket(httpServer);

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())

app.get('/test', (req, res)=>{
    res.send("server test passed✅")
})

app.use('/api/auth', userRoutes)

httpServer.listen(PORT, async() =>{
    try {
        connectDB();
        console.log(`Server is running on port:- ${PORT}`)
    } catch (error) {
        console.log(`Somthing error occured in server side`)
    }
})