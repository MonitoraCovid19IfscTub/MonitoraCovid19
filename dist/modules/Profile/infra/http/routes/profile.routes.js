"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProfileController_1 = __importDefault(require("../controllers/ProfileController"));
const profileRouter = express_1.default.Router();
const profileController = new ProfileController_1.default();
profileRouter.post('/login', profileController.login);
profileRouter.post('/', profileController.create);
exports.default = profileRouter;
//# sourceMappingURL=profile.routes.js.map