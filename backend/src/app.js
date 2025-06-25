import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}));

app.use(express.json({ limit: '16mb' }));
app.use(express.urlencoded({ limit: '16mb', extended: true }));
app.use(express.static('public'));
app.use(cookieParser());


import exercisestatusrouter from './routes/exercises.status.routes.js';
import userrouter from './routes/user.routes.js';
import plannerrouter from './routes/planner.routes.js';
import recommendationrouter from './routes/recommendation.routes.js';
import transactionrouter from './routes/transaction.routes.js';
import gymrouter from './routes/exercise.routes.js';
import notificationrouter from "./routes/notifications.routes.js";

app.use("/api/v1/user", userrouter); //done
app.use("/api/v1/planner", plannerrouter);//done
app.use("/api/v1/recommendation", recommendationrouter);//done
app.use("/api/v1/transaction", transactionrouter);//done
app.use("/api/v1/statusexercise", exercisestatusrouter);
app.use("/api/v1/exercise", gymrouter);//done
app.use("/api/v1/notifications", notificationrouter);






export { app };



