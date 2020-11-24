"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Station_1 = __importDefault(require("../entities/Station"));
class StationRepository {
    constructor() {
        this.repository = typeorm_1.getRepository(Station_1.default);
    }
    findById(stationId) {
        return this.repository.findOne(stationId);
    }
}
exports.default = StationRepository;
//# sourceMappingURL=StationRepository.js.map