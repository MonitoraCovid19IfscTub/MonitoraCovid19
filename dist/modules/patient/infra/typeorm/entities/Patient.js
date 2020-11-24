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
const Measurement_1 = __importDefault(require("../../../../measurements/infra/typeorm/entities/Measurement"));
const Profile_1 = __importDefault(require("../../../../Profile/infra/typeorm/entities/Profile"));
const Professional_1 = __importDefault(require("../../../../professional/infra/typeorm/entities/Professional"));
let Patient = class Patient {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Patient.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Patient.prototype, "birthDate", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "address", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Patient.prototype, "addressNumber", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "addressComplement", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "postalCode", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Patient.prototype, "monitoringStart", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "accompanyingPerson", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "accompanyingContact", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], Patient.prototype, "active", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "neighborhood", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "city", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "state", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Patient.prototype, "profileId", void 0);
__decorate([
    typeorm_1.OneToOne(() => Profile_1.default, {
        cascade: true,
    }),
    typeorm_1.JoinColumn({ name: 'profileId' }),
    __metadata("design:type", Profile_1.default)
], Patient.prototype, "profile", void 0);
__decorate([
    typeorm_1.OneToMany(type => Measurement_1.default, measurement => measurement.patient),
    __metadata("design:type", Array)
], Patient.prototype, "measurements", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Professional_1.default, professionals => professionals.patients, { nullable: false }),
    __metadata("design:type", Array)
], Patient.prototype, "professionals", void 0);
Patient = __decorate([
    typeorm_1.Entity('patient')
], Patient);
exports.default = Patient;
//# sourceMappingURL=Patient.js.map