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
const ReturnAccompaniedPatientsByProfessional_1 = __importDefault(require("../../services/ReturnAccompaniedPatientsByProfessional"));
const ReturnProfessionalByProfileService_1 = __importDefault(require("../../services/ReturnProfessionalByProfileService"));
const Profile_1 = __importDefault(require("../../../Profile/infra/typeorm/entities/Profile"));
class ProfessionalController {
    patientsMonitored(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const professionalProfileId = request.profileId;
                const profile = new Profile_1.default();
                profile.id = professionalProfileId;
                const returnProfessionalByProfileService = new ReturnProfessionalByProfileService_1.default(profile);
                const professional = yield returnProfessionalByProfileService.run();
                const returnAccompaniedPatientByProfessional = new ReturnAccompaniedPatientsByProfessional_1.default(professional);
                const patients = yield returnAccompaniedPatientByProfessional.run();
                response.send(patients);
            }
            catch (err) {
                console.log(err);
                response.status(500).send({ error: "failure to seek monitored patients" });
            }
        });
    }
}
exports.default = ProfessionalController;
//# sourceMappingURL=professionalController.js.map