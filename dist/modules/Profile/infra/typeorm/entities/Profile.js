"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const ProfileType_1 = __importDefault(require("./ProfileType"));
const encryptPassword = {
    from(value) {
        return value;
    },
    to(value) {
        const hash = bcrypt_1.default.hashSync(value, 10);
        return hash;
    },
};
let Profile = class Profile {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Profile.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Profile.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ select: false, transformer: [encryptPassword] }),
    __metadata("design:type", String)
], Profile.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Profile.prototype, "contact", void 0);
__decorate([
    typeorm_1.ManyToOne(type => ProfileType_1.default, profileType => profileType.id),
    __metadata("design:type", ProfileType_1.default)
], Profile.prototype, "profileType", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Profile.prototype, "createAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Profile.prototype, "updateAt", void 0);
Profile = __decorate([
    typeorm_1.Entity('profile')
], Profile);
exports.default = Profile;
//# sourceMappingURL=Profile.js.map