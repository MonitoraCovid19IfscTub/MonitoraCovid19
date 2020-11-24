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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_json_1 = require("../../../config/config.json");
class GenerateANewToken {
    constructor(params) {
        const THIRTY_DAYS = 2592000;
        this.expireIn = THIRTY_DAYS;
        this.params = params;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.sign(this.params, config_json_1.secret, {
                expiresIn: this.expireIn,
            });
        });
    }
}
exports.default = GenerateANewToken;
//# sourceMappingURL=GenerateANewToken.js.map