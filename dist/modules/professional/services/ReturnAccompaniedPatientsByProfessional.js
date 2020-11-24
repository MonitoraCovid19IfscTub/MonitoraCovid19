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
const ProfessionalRepository_1 = __importDefault(require("../infra/typeorm/repositories/ProfessionalRepository"));
class ReturnAccompaniedPatientsByProfessional {
    constructor(professional) {
        this.professional = professional;
        this.repository = new ProfessionalRepository_1.default();
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findPatientsRelations(this.professional);
        });
    }
}
exports.default = ReturnAccompaniedPatientsByProfessional;
//# sourceMappingURL=ReturnAccompaniedPatientsByProfessional.js.map