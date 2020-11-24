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
const CreateANewPatientService_1 = __importDefault(require("../../../services/CreateANewPatientService"));
const ReturnProfessionalByProfileService_1 = __importDefault(require("../../../../professional/services/ReturnProfessionalByProfileService"));
const Profile_1 = __importDefault(require("../../../../Profile/infra/typeorm/entities/Profile"));
const ReturnPatientByProfileService_1 = __importDefault(require("../../../services/ReturnPatientByProfileService"));
const ReturnPatientMeasurementsAndProfessionalsById_1 = __importDefault(require("../../../services/ReturnPatientMeasurementsAndProfessionalsById"));
const SendEmailByCreatedPatient_1 = __importDefault(require("../../../services/SendEmailByCreatedPatient"));
class PatientController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = request.body;
            try {
                const professionalProfileId = request.profileId;
                const profile = new Profile_1.default();
                profile.id = professionalProfileId;
                const returnProfessionalByProfileService = new ReturnProfessionalByProfileService_1.default(profile);
                const professional = yield returnProfessionalByProfileService.run();
                if (!professional) {
                    return response.status(403).send({ error: 'only professionals can register patients' });
                }
                const createANewPatientService = new CreateANewPatientService_1.default(Object.assign({ professional }, data));
                const patient = yield createANewPatientService.run();
                if (!patient) {
                    return response.status(400).send({ error: "invalid data, please check the data and try again" });
                }
                const sendEmailByPatient = new SendEmailByCreatedPatient_1.default(patient);
                yield sendEmailByPatient.run();
                return response.status(201).send();
            }
            catch (err) {
                return response.status(500).send({ error: err.message });
            }
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileId = request.profileId;
            const ṕatientId = request.query.patientId;
            const profile = new Profile_1.default();
            profile.id = profileId;
            const returnPatientByProfileService = new ReturnPatientByProfileService_1.default(profile);
            const patientProfile = yield returnPatientByProfileService.run();
            if (!patientProfile) {
                if (!ṕatientId) {
                    return response.status(403).send({ error: "no patientId provided" });
                }
                const returnPatientById = new ReturnPatientMeasurementsAndProfessionalsById_1.default(ṕatientId);
                const patient = yield returnPatientById.run();
                if (!patient) {
                    return response.status(404).send({ error: 'patient not found ' });
                }
                const returnProfessionalByProfileService = new ReturnProfessionalByProfileService_1.default(profile);
                const professional = yield returnProfessionalByProfileService.run();
                if (!professional) {
                    return response.status(403).send({ error: "acesses denied" });
                }
                const found = patient.professionals.find(professionalPatient => professionalPatient.id == professional.id);
                patient.professionals = undefined;
                patient.profileId = undefined;
                if (!found) {
                    return response.status(403).send({ error: 'you are not allowed to access this patient\'s data' });
                }
                return response.send(patient);
            }
            else {
                const returnPatientById = new ReturnPatientMeasurementsAndProfessionalsById_1.default(patientProfile.id);
                const patient = yield returnPatientById.run();
                if (patient) {
                    return response.send(patient);
                }
            }
        });
    }
}
exports.default = PatientController;
//# sourceMappingURL=PatientController.js.map