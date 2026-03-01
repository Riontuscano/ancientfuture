import express from 'express';
import dotenv from 'dotenv';
import connectDB from './mongoDBconnect.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';

dotenv.config({ path: '.env.local' })

const app = express();
const port = process.env.PORT || 8080;

const allowedOrigins = [
    'http://localhost:5173',
    'https://ancientfuture-alpha.vercel.app'
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));
  

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Hello Working!!!!!!")
}) 

app.use('/api/auth',authRoutes)

app.listen(port,()=>{
    connectDB()
    console.log(`server is running on port ${port}`);

    // Keep-alive: ping self every 14 minutes to prevent Render free tier spin-down
    const INTERVAL_MS = 14 * 60 * 1000; // 14 minutes
    if (process.env.NODE_ENV === 'production') {
        const url = process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`;
        setInterval(async () => {
            try {
                const res = await fetch(`${url}/`);
                console.log(`[Keep-Alive] Pinged ${url} — Status: ${res.status}`);
            } catch (err) {
                console.error(`[Keep-Alive] Failed to ping ${url}:`, err.message);
            }
        }, INTERVAL_MS);
        console.log(`[Keep-Alive] Self-ping scheduled every 14 minutes`);
    }
})
