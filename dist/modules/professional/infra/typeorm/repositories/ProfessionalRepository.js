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
const typeorm_1 = require("typeorm");
const Professional_1 = __importDefault(require("../entities/Professional"));
class ProfessionalRepository {
    constructor() {
        this.repository = typeorm_1.getRepository(Professional_1.default);
    }
    findById(professionalId) {
        return this.repository.findOne(professionalId);
    }
    findByProfileAndReturnRelations(profile) {
        return this.repository
            .createQueryBuilder('professional')
            .leftJoinAndSelect('professional.profile', 'profile')
            .where('professional.profile = :profileId', { profileId: profile.id })
            .getOne();
    }
    save(professional) {
        return this.repository.save(professional);
    }
    findPatientsRelations(professional) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = this.repository.createQueryBuilder('professional')
                .leftJoinAndSelect("professional.patients", "patient")
                .leftJoinAndSelect('patient.measurements', 'measurement')
                .leftJoinAndSelect('measurement.type', 'measurementType')
                .where('professional.id = :id', { id: professional.id })
                .getOne();
            return (yield response).patients;
        });
    }
}
exports.default = ProfessionalRepository;
//# sourceMappingURL=ProfessionalRepository.js.map