"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PatientRepository_1 = __importDefault(require("../infra/typeorm/repositories/PatientRepository"));
class ReturnPatientMeasurementsAndProfessionalsById {
    constructor(patientId) {
        this.patientId = patientId;
        this.repository = new PatientRepository_1.default();
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findByIdAndReturnPatientMeasurementsAndProfessionals(this.patientId);
        });
    }
}
exports.default = ReturnPatientMeasurementsAndProfessionalsById;
//# sourceMappingURL=ReturnPatientMeasurementsAndProfessionalsById.js.map