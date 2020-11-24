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
const Patient_1 = __importDefault(require("../../../../patient/infra/typeorm/entities/Patient"));
const Station_1 = __importDefault(require("../../../../station/infra/typeorm/entities/Station"));
const MeasurementType_1 = __importDefault(require("./MeasurementType"));
let Measurement = class Measurement {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Measurement.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Measurement.prototype, "measurement", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Station_1.default, stationId => stationId.id, {}),
    __metadata("design:type", Station_1.default)
], Measurement.prototype, "station", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Patient_1.default, patientId => patientId.measurements, {}),
    __metadata("design:type", Patient_1.default)
], Measurement.prototype, "patient", void 0);
__decorate([
    typeorm_1.ManyToOne(type => MeasurementType_1.default, measurementType => measurementType.id),
    __metadata("design:type", MeasurementType_1.default)
], Measurement.prototype, "type", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Measurement.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('timestamp'),
    __metadata("design:type", Date)
], Measurement.prototype, "registeredAt", void 0);
Measurement = __decorate([
    typeorm_1.Entity('measurements')
], Measurement);
exports.default = Measurement;
//# sourceMappingURL=Measurement.js.map