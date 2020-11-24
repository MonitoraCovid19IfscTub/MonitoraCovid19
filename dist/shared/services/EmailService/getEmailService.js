"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_1 = require("querystring");
exports.getEmailService = () => {
    return {
        send: (to, templateDir, context) => {
            console.log(`Email enviado para ${to} com os dados  ${querystring_1.stringify(context)}`);
            return true;
        }
    };
};
//# sourceMappingURL=getEmailService.js.map