"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getEmailService_1 = require("../../../shared/services/EmailService/getEmailService");
class SendEmailByCreatedPatient {
    constructor(patient) {
        this.patient = patient;
        this.sendEmail = getEmailService_1.getEmailService();
    }
    run() {
        return this.sendEmail.send(this.patient.profile.email, 'src/emai', { email: this.patient.profile.email,
            password: this.patient.profile.password
        });
    }
}
exports.default = SendEmailByCreatedPatient;
//# sourceMappingURL=SendEmailByCreatedPatient.js.map