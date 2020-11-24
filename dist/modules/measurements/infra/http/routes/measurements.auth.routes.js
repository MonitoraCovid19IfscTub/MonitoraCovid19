"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MeasuramentControllers_1 = __importDefault(require("../../controllers/MeasuramentControllers"));
const autenticationProfile_1 = __importDefault(require("../../../../Profile/infra/http/middleware/autenticationProfile"));
const measurementsAuthRouter = express_1.default.Router();
const measurementControllers = new MeasuramentControllers_1.default();
measurementsAuthRouter.get('/', autenticationProfile_1.default, measurementControllers.index);
exports.default = measurementsAuthRouter;
//# sourceMappingURL=measurements.auth.routes.js.map