"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ProfileType_1 = __importDefault(require("../entities/ProfileType"));
class ProfileTypeRepository {
    constructor() {
        this.repository = typeorm_1.getRepository(ProfileType_1.default);
    }
    findTypeByName(name) {
        return this.repository.findOne({ name: name });
    }
}
exports.default = ProfileTypeRepository;
//# sourceMappingURL=ProfiletypeRepository.js.map