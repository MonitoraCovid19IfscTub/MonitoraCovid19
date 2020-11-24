"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProfileRepository_1 = __importDefault(require("../../typeorm/repositories/ProfileRepository"));
const authenticationProfessional = (request, response, next) => {
    const { profileId } = request;
    if (!profileId) {
        response.status(401).send({ error: 'Not logged' });
    }
    const profileRepository = new ProfileRepository_1.default();
    profileRepository
        .findProfileAndTypeProfileById(profileId)
        .then(profile => {
        if (!profile) {
            return response.status(403).send({ error: 'profile not exist' });
        }
        if (profile.profileType.name === 'Patient') {
            return response.status(403).send({ error: 'accesses denied' });
        }
        if (profile.profileType.name === 'Professional') {
            return next();
        }
        return response.status(403).send({ error: 'accesses denied' });
    })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch(err => {
        console.log(err);
        response
            .status(500)
            .send({ error: 'error in processes profile, try again' });
    });
};
exports.default = authenticationProfessional;
//# sourceMappingURL=authenticationProfessional.js.map