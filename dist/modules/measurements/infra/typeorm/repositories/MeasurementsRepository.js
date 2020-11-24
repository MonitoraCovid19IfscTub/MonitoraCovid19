"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Measurement_1 = __importDefault(require("../entities/Measurement"));
const MeasurementType_1 = __importDefault(require("../entities/MeasurementType"));
class MeasurementsRepository {
    constructor() {
        this.repository = typeorm_1.getRepository(Measurement_1.default);
    }
    create({ value, patient, registeredAt, station, typeId, }) {
        const entityMeasurement = new Measurement_1.default();
        const type = new MeasurementType_1.default();
        type.id = typeId;
        Object.assign(entityMeasurement, {
            measurement: value,
            patient,
            registeredAt,
            station,
        });
        entityMeasurement.type = type;
        return this.repository.save(entityMeasurement);
    }
    findManyByPatientId(patientId) {
        return this.repository.find({
            relations: ['type'],
            where: { patient: patientId }
        });
    }
}
exports.default = MeasurementsRepository;
//# sourceMappingURL=MeasurementsRepository.js.map