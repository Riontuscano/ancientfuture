import express from 'express';
import dotenv from 'dotenv';
import connectDB from './mongoDBconnect.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';

dotenv.config({ path: '.env.local' })

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({ origin: 'https://ancientfuture-alpha.vercel.app', credentials: true }));



app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Hello Working!!!!!!")
}) 

app.use('/api/auth',authRoutes)

app.listen(port,()=>{
    connectDB()
    console.log(`server is running on port ${port}`);
})
