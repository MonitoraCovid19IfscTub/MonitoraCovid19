"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_json_1 = require("../../../../../config/config.json");
const authenticationProfile = (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        response.status(401).send({ error: 'No Token Provided' });
        return;
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        response.status(401).send({ error: 'Header invalid' });
        return;
    }
    const [schema, token] = parts;
    if (!(/^Bearer$/i.test(schema))) {
        response.status(401).send({ error: 'Token malformed' });
        return;
    }
    jsonwebtoken_1.default.verify(token, config_json_1.secret, (err, decoded) => {
        if (err) {
            response.status(401).send({ error: 'Token invalid' });
            return;
        }
        const { profileId } = decoded;
        request.profileId = profileId;
        next();
    });
};
exports.default = authenticationProfile;
//# sourceMappingURL=autenticationProfile.js.map