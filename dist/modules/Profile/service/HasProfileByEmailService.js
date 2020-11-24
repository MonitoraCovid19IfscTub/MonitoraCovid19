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
const ProfileRepository_1 = __importDefault(require("../infra/typeorm/repositories/ProfileRepository"));
class HasProfileByEmailService {
    constructor(email) {
        this.profileRepository = new ProfileRepository_1.default();
        this.email = email;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const profileEmail = yield this.profileRepository.findProfileByEmail(this.email);
            if (!profileEmail) {
                return false;
            }
            return true;
        });
    }
}
exports.default = HasProfileByEmailService;
//# sourceMappingURL=HasProfileByEmailService.js.map