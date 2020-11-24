"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patients_routes_1 = __importDefault(require("../../../../modules/patient/infra/http/routes/patients.routes"));
const measurements_routes_1 = __importDefault(require("../../../../modules/measurements/infra/http/routes/measurements.routes"));
const profile_routes_1 = __importDefault(require("../../../../modules/Profile/infra/http/routes/profile.routes"));
const professional_routes_1 = __importDefault(require("../../../../modules/professional/infra/http/routes/professional.routes"));
const router = express_1.Router();
router.use('/api/patient', patients_routes_1.default);
router.use('/api/measurement', measurements_routes_1.default);
router.use('/api/profile', profile_routes_1.default);
router.use('/api/professional', professional_routes_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map