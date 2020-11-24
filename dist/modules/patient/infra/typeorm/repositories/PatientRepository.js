"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Patient_1 = __importDefault(require("../entities/Patient"));
class PatientRepository {
    constructor() {
        this.repository = typeorm_1.getRepository(Patient_1.default);
    }
    save(data) {
        return this.repository.save(data);
    }
    findById(patientId) {
        return this.repository.findOne({ id: patientId });
    }
    findByIdAndReturnPatientMeasurementsAndProfessionals(patientId) {
        return this.repository.createQueryBuilder('patient')
            .leftJoinAndSelect('patient.profile', 'profile')
            .leftJoinAndSelect('patient.measurements', 'measurement')
            .leftJoinAndSelect('measurement.type', 'measurementType')
            .leftJoinAndSelect('patient.professionals', 'professional')
            .where('patient.id = :id', { id: patientId })
            .getOne();
    }
    findByProfileAndReturnRelations(profile) {
        return this.repository
            .createQueryBuilder('patient')
            .leftJoinAndSelect('patient.profile', 'profile')
            .where('patient.profile = :profileId', { profileId: profile.id })
            .getOne();
    }
}
exports.default = PatientRepository;
//# sourceMappingURL=PatientRepository.js.map