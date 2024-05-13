import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors'


import authRoutes from "./routes/auth.routes.js";
import authService from "./routes/service.routes.js";



const app= express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json()); //esto es un midelewar
app.use(cookieParser()); //

app.use('/api', authRoutes);
app.use('/api', authService);

export default app;