"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Profile_1 = __importDefault(require("../entities/Profile"));
class ProfileRepository {
    constructor() {
        this.repository = typeorm_1.getRepository(Profile_1.default);
    }
    findProfileAndTypeProfileById(profileId) {
        return this.repository.findOne(profileId, {
            relations: ['profileType'],
        });
    }
    findProfileByEmail(email) {
        return this.repository
            .createQueryBuilder('profile')
            .addSelect('profile.password')
            .leftJoinAndSelect('profile.profileType', 'profileType')
            .where('profile.email ILIKE :email', { email })
            .getOne();
    }
    save(profile) {
        return this.repository.save(profile);
    }
}
exports.default = ProfileRepository;
//# sourceMappingURL=ProfileRepository.js.map