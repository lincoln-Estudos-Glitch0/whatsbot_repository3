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
exports.MessageTemplate = void 0;
const listMessageType_1 = __importDefault(require("./listMessageType"));
const locationType_1 = __importDefault(require("./locationType"));
class MessageTemplate {
    constructor() { }
    send(to, section, type, header, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!to) {
                return false;
            }
            if (type) {
                if (type == 'list') {
                    yield (0, listMessageType_1.default)(to, section, header, body);
                }
            }
        });
    }
    sendLocation(to) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!to) {
                return false;
            }
            yield (0, locationType_1.default)(to);
        });
    }
}
exports.MessageTemplate = MessageTemplate;
