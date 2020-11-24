"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const MeasurementType_1 = __importDefault(require("../entities/MeasurementType"));
class MeasurementTypesRepository {
    constructor() {
        this.repository = typeorm_1.getRepository(MeasurementType_1.default);
    }
    findById(typeId) {
        return this.repository.findOne({ id: typeId });
    }
    create() {
        return false;
    }
}
exports.default = MeasurementTypesRepository;
//# sourceMappingURL=MeasurementTypes.js.map