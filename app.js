import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectPassport } from "./utils/Provider.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { errorMiddleware } from "./middlewares/errorMiddlewware.js";
import cors from "cors";
const app = express();

dotenv.config({
    path : "./config/config.env"
})
app.use(cookieParser())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);

connectPassport();
//importing Routes
import userRoute from "./routes/user.js";
import orderRoute from "./routes/order.js"
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
// Using Error Middleware
app.use(errorMiddleware);
export default app;