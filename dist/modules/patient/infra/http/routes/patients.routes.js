"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const autenticationProfile_1 = __importDefault(require("../../../../Profile/infra/http/middleware/autenticationProfile"));
const express_1 = __importDefault(require("express"));
const PatientController_1 = __importDefault(require("../controllers/PatientController"));
const celebrate_1 = require("celebrate");
const patientsRouter = express_1.default.Router();
const patientController = new PatientController_1.default();
patientsRouter.use(celebrate_1.errors());
patientsRouter.use(autenticationProfile_1.default);
patientsRouter.post('/', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().min(3).required(),
        birthDate: celebrate_1.Joi.string().isoDate().required(),
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().min(8).required(),
        contact: celebrate_1.Joi.string().replace(/[\(\+\) \-\.]/gi, '').trim().pattern(/^[0-9]+$/, 'numbers').min(8).max(15).required(),
        monitoringStart: celebrate_1.Joi.string().isoDate().required(),
        accompanying: celebrate_1.Joi.object().keys({
            name: celebrate_1.Joi.string().min(3).required(),
            contact: celebrate_1.Joi.string().replace(/[\(\+\) \-\.]/gi, '').trim().pattern(/^[0-9]+$/, 'numbers').min(8).max(15).required()
        }),
        address: celebrate_1.Joi.object().keys({
            street: celebrate_1.Joi.string().min(3).max(250).required(),
            number: celebrate_1.Joi.number().required(),
            complement: celebrate_1.Joi.string().max(250),
            postalCode: celebrate_1.Joi.string().min(4),
            neighborhood: celebrate_1.Joi.string().min(2).required(),
            city: celebrate_1.Joi.string().min(2).max(200).required(),
            state: celebrate_1.Joi.string().min(2).max(200).required()
        }).required()
    })
}), patientController.create);
patientsRouter.get('/', patientController.show);
exports.default = patientsRouter;
//# sourceMappingURL=patients.routes.js.map