"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = (to) => __awaiter(void 0, void 0, void 0, function* () {
    const opts = {
        headers: {
            'Authorization': process.env.AXIOS_HEADER_TOKEN
        }
    };
    let message = {
        messaging_product: "whatsapp",
        to: to,
        type: "interactive",
        interactive: {
            type: "location_request_message",
            body: {
                text: "Enviar endereço para entrega:"
            },
            action: {
                name: "localizar"
            }
        }
    };
    yield axios_1.default.post(`https://graph.facebook.com/v19.0/${process.env.WHATS_CEL_ID}/messages`, message, opts);
});
