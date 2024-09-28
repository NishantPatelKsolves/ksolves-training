import express from 'express';
import cors from 'cors';

const app = express();

//only after app is created, we inject middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credential:true
}))

app.get('/',(req,res)=>{
    res.send('Home route');
})
export {app};