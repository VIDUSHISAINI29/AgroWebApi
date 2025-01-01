import {config} from "dotenv";
config();
import express from "express";
import pkg from "duckdb";
import CORS from "cors";
import routes from "./routes/index.js";
import exp from "constants";

const {Database} = pkg;
const app = express();
const allowedOrigin = process.env.FRONTEND_URL

app.use(
    CORS({
        origin: allowedOrigin,
        credentials: true,
    })
)

const PORT = 4024;

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})