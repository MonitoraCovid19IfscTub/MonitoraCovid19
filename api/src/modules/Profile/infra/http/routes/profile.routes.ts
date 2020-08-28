import express from 'express';
import ProfileController from '../controllers/ProfileController';

const profileRouter = express.Router();
const profileController = new ProfileController();

profileRouter.post('/', profileController.login);

export default profileRouter;
