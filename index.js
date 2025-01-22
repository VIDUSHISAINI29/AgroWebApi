import { config } from "dotenv";
config();
import express from "express";
import pkg from "duckdb";
import CORS from "cors";
import routes from "./routes/index.js";
import exp from "constants";
import pkgA from "express-openid-connect";
import passport from "passport";
import Auth0Strategy from "passport-auth0";
import session from "express-session";
const { auth, requiresAuth } = pkgA;

const { Database } = pkg;
const app = express();
const allowedOrigin = process.env.FRONTEND_URL;

const configAuth = {
   authRequired: false,
   auth0Logout: true,
   baseURL: allowedOrigin,
   clientID: process.env.CLIENT_ID,
   issuerBaseURL: process.env.DOMAIN_NAME,
   secret: process.env.SECRET_ID,
};

app.use(
   CORS({
      origin: allowedOrigin,
      credentials: true,
   }),
   auth(configAuth)
);

const sessionConfiguration = session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: true,
   cookie: { secure: false }, // Set to true in production with HTTPS
});

app.use(sessionConfiguration);

const authStrategy = new Auth0Strategy(
   {
      domain: process.env.DOMAIN_NAME,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.SECRET_ID,
      callbackURL: `${process.env.FRONTEND_URL}/callback`,
   },
   function (accessToken, refreshToken, extraParams, profile, done) {
      return done(null, profile);
   }
);

passport.use(authStrategy);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get(
   "/login",
   passport.authenticate("auth0", { scope: "openid email profile" })
);

app.get(
   "/callback",
   passport.authenticate("auth0", { failureRedirect: "/" }),
   (req, res) => {
      res.redirect("/profile");
   }
);

app.get("/profile", (req, res) => {
   if (!req.user) return res.status(401).send("Unauthorized");
   res.json({ user: req.user });
});

app.get("/logout", (req, res) => {
   req.logout(() => {
      res.redirect(
         `https://${process.env.AUTH0_DOMAIN}/v2/logout?returnTo=${process.env.FRONTEND_URL}`
      );
   });
});

const PORT = 4024;

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
   console.log(`server is running on port ${PORT}`);
});
