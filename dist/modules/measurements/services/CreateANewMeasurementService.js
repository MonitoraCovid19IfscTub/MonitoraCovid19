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
const StationRepository_1 = __importDefault(require("../../station/infra/typeorm/repositories/StationRepository"));
const PatientRepository_1 = __importDefault(require("../../patient/infra/typeorm/repositories/PatientRepository"));
const MeasurementsRepository_1 = __importDefault(require("../infra/typeorm/repositories/MeasurementsRepository"));
const MeasurementTypes_1 = __importDefault(require("../infra/typeorm/repositories/MeasurementTypes"));
class CreateANewMeasurementService {
    constructor(patientId, stationId, measurement) {
        this.measurement = measurement;
        this.patientId = patientId;
        this.stationId = stationId;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            // pega o tipo no banco
            // Patient Service return Patient
            const patientRepository = new PatientRepository_1.default();
            const patient = yield patientRepository.findById(this.patientId);
            // Station Service Return Station
            const stationRepository = new StationRepository_1.default();
            const station = yield stationRepository.findById(this.stationId);
            const measuramentTypesRepository = new MeasurementTypes_1.default();
            const measuramentType = yield measuramentTypesRepository.findById(this.measurement.typeId);
            if (!measuramentType) {
                throw new Error('type measurament not exist');
            }
            const { value, registeredAt, typeId } = this.measurement;
            const measurementRepository = new MeasurementsRepository_1.default();
            measurementRepository.create({
                value,
                patient,
                station,
                registeredAt,
                typeId,
            });
        });
    }
}
exports.default = CreateANewMeasurementService;
//# sourceMappingURL=CreateANewMeasurementService.js.map