import { config } from "dotenv";
config();
import express from "express";
import pkg from "duckdb";
import CORS from "cors";
import routes from "./routes/index.js";
import exp from "constants";
import { auth, requiresAuth } from "express-openid-connect";

const { Database } = pkg;
const app = express();
const allowedOrigin = process.env.FRONTEND_URL;

const config = {
   authRequired: false,
   auth0Logout: true,
   baseURL: "http://localhost:3000",
   clientID: "9o7tHhtccMFOQ6GP73DVihYxmxz3JgQW",
   issuerBAseURL: "https://dev-f04z6x76c5w5eah6.us.auth0.com",
   secret: "LONG_RANDOM_STRING",
};

app.use(
   CORS({
      origin: allowedOrigin,
      credentials: true,
   }),
   auth(config)
);

app.get("/", (req, res) => {
   res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
   ressend(JSON.stringify(req.oidc.user, null, 2));
});

const PORT = 4024;

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
   console.log(`server is running on port ${PORT}`);
});
