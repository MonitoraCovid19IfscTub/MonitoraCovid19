"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const MeasuramentControllers_1 = __importDefault(require("../../controllers/MeasuramentControllers"));
const measurements_auth_routes_1 = __importDefault(require("./measurements.auth.routes"));
const measurementsRouter = express_1.default.Router();
const measurementControllers = new MeasuramentControllers_1.default();
measurementsRouter.use(celebrate_1.errors());
measurementsRouter.use(measurements_auth_routes_1.default);
measurementsRouter.post('/', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        patientId: celebrate_1.Joi.string().required().uuid(),
        stationId: celebrate_1.Joi.string().required().uuid(),
        measurement: celebrate_1.Joi.object().keys({
            value: celebrate_1.Joi.number().required(),
            typeId: celebrate_1.Joi.number().integer().required(),
            registeredAt: celebrate_1.Joi.date().iso().required().min('01-01-2020'),
        }),
    }),
}), measurementControllers.create);
exports.default = measurementsRouter;
//# sourceMappingURL=measurements.routes.js.map