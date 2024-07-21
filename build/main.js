"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const webhookRouter_1 = require("./routes/webhookRouter");
let app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(webhookRouter_1.WebhookController);
app.listen(process.env.HOST_PORT, () => console.log('listening at port: ', process.env.HOST_PORT || 3000));
