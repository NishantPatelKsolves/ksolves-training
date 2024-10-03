import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

//only after app is created, we inject middlewares
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credential: true,
    })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

console.log('All middlewares loaded successfully');

// any request can fail, and writing try-catch for each end-point is cumbersome, so we use async handler
app.get('/', (req, res) => {
    res.send('Home route');
});

//bring routes
import healthCheckRouter from './routes/healthCheck.routes.js';
app.use('/api/v1/healthcheck', healthCheckRouter);
//app.get('healthcheck', () => {});

import userRouter from './routes/user.routes.js';
app.use('/api/v1/users', userRouter);

export { app };
