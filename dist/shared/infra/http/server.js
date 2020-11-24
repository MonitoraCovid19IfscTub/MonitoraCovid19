"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("../typeorm");
const routes_1 = __importDefault(require("./routes/routes"));
const server = express_1.default();
server.use(cors_1.default());
server.use(express_1.default.json());
server.use(routes_1.default);
server.listen(5000, () => {
    // eslint-disable-next-line no-console
    console.log('ok');
});
//# sourceMappingURL=server.js.map