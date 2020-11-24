"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const autenticationProfile_1 = __importDefault(require("../../../../Profile/infra/http/middleware/autenticationProfile"));
const express_1 = require("express");
const professionalController_1 = __importDefault(require("../../controller/professionalController"));
const professionalRouter = express_1.Router();
const professionalController = new professionalController_1.default();
professionalRouter.use(autenticationProfile_1.default);
professionalRouter.get('/patientsMonitored', professionalController.patientsMonitored);
exports.default = professionalRouter;
//# sourceMappingURL=professional.routes.js.map