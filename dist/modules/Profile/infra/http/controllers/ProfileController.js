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
const GenerateANewToken_1 = __importDefault(require("../../../service/GenerateANewToken"));
const ProfileLogin_1 = __importDefault(require("../../../service/ProfileLogin"));
const Professional_1 = __importDefault(require("../../../../professional/infra/typeorm/entities/Professional"));
const ProfessionalRepository_1 = __importDefault(require("../../../../professional/infra/typeorm/repositories/ProfessionalRepository"));
const ProfiletypeRepository_1 = __importDefault(require("../../typeorm/repositories/ProfiletypeRepository"));
const Profile_1 = __importDefault(require("../../typeorm/entities/Profile"));
class ProfileController {
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request.body;
            try {
                /// criar um service que retorna Profile
                const profileLogin = new ProfileLogin_1.default(email, password);
                const user = yield profileLogin.run();
                if (!user) {
                    return response
                        .status(400)
                        .send({ error: 'invalid password or email' });
                }
                /**
                 * ProfileID
                 * nome
                 * email
                 * type
                 *
                 * SE for um paciente
                 * Retorna os dados do paciente
                 *
                 * SE FOR um profissional
                 * RETorna os dados do profissional
                 */
                const generateToken = new GenerateANewToken_1.default({
                    profileId: user.profile.id,
                });
                const token = yield generateToken.run();
                user.profile.id = undefined;
                user.id = undefined;
                return response.status(200).send({ user, token });
            }
            catch (err) {
                return response.status(400).send({ error: err });
            }
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, contact } = request.body;
            try {
                const profileTypeRepository = new ProfiletypeRepository_1.default();
                const profileType = yield profileTypeRepository.findTypeByName('Professional');
                if (!profileType) {
                    throw new Error('profile type not exist');
                }
                const profile = new Profile_1.default();
                profile.email = email;
                profile.password = password;
                profile.contact = contact;
                profile.profileType = profileType;
                const professional = new Professional_1.default();
                professional.profile = profile;
                const professionalRepository = new ProfessionalRepository_1.default();
                yield professionalRepository.save(professional);
                return response.status(201).send();
            }
            catch (err) {
                console.log(err);
                return response
                    .status(500)
                    .send({ error: 'error in register, try again' });
            }
        });
    }
}
exports.default = ProfileController;
//# sourceMappingURL=ProfileController.js.map