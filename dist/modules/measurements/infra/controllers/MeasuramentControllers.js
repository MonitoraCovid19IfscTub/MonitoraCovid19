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
const CreateANewMeasurementService_1 = __importDefault(require("../../services/CreateANewMeasurementService"));
const StationIsActive_1 = __importDefault(require("../../../station/services/StationIsActive"));
const VerifyPatientExist_1 = __importDefault(require("../../../patient/services/VerifyPatientExist"));
const Profile_1 = __importDefault(require("../../../Profile/infra/typeorm/entities/Profile"));
const ReturnPatientByProfileService_1 = __importDefault(require("../../../patient/services/ReturnPatientByProfileService"));
const ReturnMeasurementsForPatientId_1 = __importDefault(require("../../services/ReturnMeasurementsForPatientId"));
const ReturnProfessionalByProfileService_1 = __importDefault(require("../../../professional/services/ReturnProfessionalByProfileService"));
const ReturnPatientMeasurementsAndProfessionalsById_1 = __importDefault(require("../../../patient/services/ReturnPatientMeasurementsAndProfessionalsById"));
class MeasurementControllers {
    index(request, response) {
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
                const returnPatientByProfileService = new ReturnPatientMeasurementsAndProfessionalsById_1.default(ṕatientId);
                const patient = yield returnPatientByProfileService.run();
                if (!patient) {
                    return response.status(404).send({ error: 'patient not found ' });
                }
                const returnProfessionalByProfileService = new ReturnProfessionalByProfileService_1.default(profile);
                const professional = yield returnProfessionalByProfileService.run();
                if (!professional) {
                    return response.status(403).send({ error: "acesses denied" });
                }
                const found = patient.professionals.find(professionalPatient => professionalPatient.id == professional.id);
                if (!found) {
                    return response.status(403).send({ error: 'you are not allowed to access this patient\'s data' });
                }
                const returnMeasurementsForPatientId = new ReturnMeasurementsForPatientId_1.default(ṕatientId);
                const measurements = yield returnMeasurementsForPatientId.run();
                if (!measurements) {
                    return response.status(404).send({ error: 'measurements not found ' });
                }
                return response.send({ patientID: patient.id, measurements });
            }
            else {
                const returnMeasurementsForPatientId = new ReturnMeasurementsForPatientId_1.default(patientProfile.id);
                const measurements = yield returnMeasurementsForPatientId.run();
                if (!measurements) {
                    return response.send({ error: 'measurements not found ' });
                }
                return response.send({ patientID: patientProfile.id, measurements });
            }
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { patientId, stationId, measurement } = request.body;
            // identificar se a Estação  existe e se está ativo.
            try {
                const stationIsActiveService = new StationIsActive_1.default(stationId);
                const stationIsActive = yield stationIsActiveService.run();
                /*   if (!stationIsActive) {
                 return response.status(400).send({ error: 'Station not Active' });
               }*/
                // identificar se o patient existe
                const verifyPatientExist = new VerifyPatientExist_1.default(patientId);
                const patientExist = yield verifyPatientExist.run();
                if (!patientExist) {
                    return response.status(400).send({ error: 'Patient not exist' });
                }
                // Caso não existir retorna erro caso sim continue
                // insert clinical_signals measurements in data_base
                const createANewMeasurementService = new CreateANewMeasurementService_1.default(patientId, stationId, measurement);
                yield createANewMeasurementService.run();
                return response.status(201).send();
            }
            catch (err) {
                return response.status(400).send({ error: err.message });
            }
        });
    }
}
exports.default = MeasurementControllers;
// {
// 	"patient_id" : 1,
// 	"station_id": 2,
// 	"measurement":
// 	{
// 			"value": 400,
// 			"type_id": 1,
// 			"type_name": "Temperatura",
// 			"date" : "2020-02-26T10:37:34.768Z",
// 			"timestamp": 1593454768
// 	}
// }
//# sourceMappingURL=MeasuramentControllers.js.map