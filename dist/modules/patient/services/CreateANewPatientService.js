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
const Profile_1 = __importDefault(require("../../Profile/infra/typeorm/entities/Profile"));
const ProfiletypeRepository_1 = __importDefault(require("../../Profile/infra/typeorm/repositories/ProfiletypeRepository"));
const HasProfileByEmailService_1 = __importDefault(require("../../Profile/service/HasProfileByEmailService"));
const Patient_1 = __importDefault(require("../infra/typeorm/entities/Patient"));
const PatientRepository_1 = __importDefault(require("../infra/typeorm/repositories/PatientRepository"));
const crypto_1 = __importDefault(require("crypto"));
class CreateANewPatientService {
    constructor(patient) {
        console.log(patient);
        this.patient = patient;
        this.patientRepository = new PatientRepository_1.default();
        this.profileTypeRepository = new ProfiletypeRepository_1.default();
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const hasProfileByEmailService = new HasProfileByEmailService_1.default(this.patient.email);
            const hasProfile = yield hasProfileByEmailService.run();
            if (hasProfile) {
                throw new Error("This email already in use");
            }
            const profileType = yield this.profileTypeRepository.findTypeByName('Patient');
            if (!profileType) {
                throw new Error('profile type not exist');
            }
            const profile = new Profile_1.default();
            profile.email = this.patient.email;
            profile.password = crypto_1.default.randomBytes(20).toString('hex');
            profile.contact = this.patient.contact;
            profile.profileType = profileType;
            const patient = new Patient_1.default();
            if (this.patient.accompanying) {
                patient.accompanyingPerson = this.patient.accompanying.name;
                patient.accompanyingContact = this.patient.accompanying.contact;
            }
            patient.active = true;
            patient.birthDate = new Date(this.patient.birthDate);
            patient.monitoringStart = new Date(this.patient.monitoringStart);
            patient.name = this.patient.name;
            patient.professionals = [this.patient.professional];
            /**Validar endereços futuramente */
            patient.address = this.patient.address.street;
            patient.addressNumber = this.patient.address.number;
            patient.addressComplement = this.patient.address.complement;
            patient.postalCode = this.patient.address.postalCode;
            patient.neighborhood = this.patient.address.neighborhood;
            patient.city = this.patient.address.city;
            patient.state = this.patient.address.state;
            patient.profile = profile;
            try {
                const patientResponse = yield this.patientRepository.save(patient);
                return patientResponse;
            }
            catch (err) {
                throw new Error('Error insert in database');
            }
        });
    }
}
exports.default = CreateANewPatientService;
//# sourceMappingURL=CreateANewPatientService.js.map