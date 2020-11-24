"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MeasurementsRepository_1 = __importDefault(require("../infra/typeorm/repositories/MeasurementsRepository"));
class ReturnMeasurementsForPatientId {
    constructor(patientId) {
        this.patientId = patientId;
        this.repository = new MeasurementsRepository_1.default();
    }
    run() {
        return this.repository.findManyByPatientId(this.patientId);
    }
}
exports.default = ReturnMeasurementsForPatientId;
//# sourceMappingURL=ReturnMeasurementsForPatientId.js.map