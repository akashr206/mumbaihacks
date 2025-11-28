import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));



server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
