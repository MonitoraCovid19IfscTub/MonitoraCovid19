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
const bcrypt_1 = __importDefault(require("bcrypt"));
const ReturnPatientByProfileService_1 = __importDefault(require("../../patient/services/ReturnPatientByProfileService"));
const ReturnProfessionalByProfileService_1 = __importDefault(require("../../professional/services/ReturnProfessionalByProfileService"));
const ProfileRepository_1 = __importDefault(require("../infra/typeorm/repositories/ProfileRepository"));
class ProfileLogin {
    constructor(email, password) {
        this.profileRepository = new ProfileRepository_1.default();
        this.email = email;
        this.password = password;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield this.profileRepository.findProfileByEmail(this.email);
                if (!profile) {
                    return null;
                }
                const passwordIsValid = yield bcrypt_1.default.compare(this.password, profile.password);
                if (!passwordIsValid) {
                    return null;
                }
                if (profile.profileType.name === 'Patient') {
                    // retornar o paciente
                    const returnPatientByProfileService = new ReturnPatientByProfileService_1.default(profile);
                    const patient = yield returnPatientByProfileService.run();
                    return patient;
                }
                if (profile.profileType.name === 'Professional') {
                    // retornar o professional
                    const returnProfessionalByProfileService = new ReturnProfessionalByProfileService_1.default(profile);
                    const professional = yield returnProfessionalByProfileService.run();
                    return professional;
                }
                return null;
            }
            catch (err) {
                throw new Error('Login failed');
            }
        });
    }
}
exports.default = ProfileLogin;
//# sourceMappingURL=ProfileLogin.js.map