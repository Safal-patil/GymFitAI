import { OAuth2Client } from 'google-auth-library';
import { Router } from 'express';
import { googleLogin } from '../controllers/google.controller.js';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleRouter = Router();

googleRouter.route('/google').post(googleLogin);

export default googleRouter;
