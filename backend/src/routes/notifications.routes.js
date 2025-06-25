import { getNotifications, addNotification } from "../controllers/notifications.controller";

import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const notificationrouter = Router();

notificationrouter.route("/getnotifications").get(verifyJWT, getNotifications);
notificationrouter.route("/addnotification").post(verifyJWT, addNotification);

export default notificationrouter;