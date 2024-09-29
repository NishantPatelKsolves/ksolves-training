import express from 'express';
import cors from 'cors';

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

// any request can fail, and writing try-catch for each end-point is cumbersome, so we use async handler
app.get('/', (req, res) => {
    res.send('Home route');
});

//bring routes
import healthCheckRouter from './routes/healthCheck.routes.js';
app.use('/api/v1/healthcheck', healthCheckRouter);
//app.get('healthcheck', () => {});
export { app };
