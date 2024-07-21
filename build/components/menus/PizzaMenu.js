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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PizzaMenu_params;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PizzaMenu = void 0;
const messageTemplate_1 = require("../classes/message/messageTemplate");
const promises_1 = require("node:fs/promises");
class PizzaMenu {
    constructor() {
        _PizzaMenu_params.set(this, void 0);
        let tmp = (0, promises_1.readFile)("build/components/menus/MenuContent/pizzaMenu.json");
        __classPrivateFieldSet(this, _PizzaMenu_params, tmp, "f");
    }
    send(to) {
        return __awaiter(this, void 0, void 0, function* () {
            let tmp = JSON.parse((yield __classPrivateFieldGet(this, _PizzaMenu_params, "f")).toString());
            yield new messageTemplate_1.MessageTemplate().send(to, tmp.sections, "list", tmp.header, tmp.body);
        });
    }
    strategy(message, strategy) {
        return __awaiter(this, void 0, void 0, function* () {
            if (strategy == "pizzamenu-taste-01") {
                yield new messageTemplate_1.MessageTemplate().sendLocation(message.from);
            }
            else if (strategy == "pizzamenu-taste-02") {
                yield new messageTemplate_1.MessageTemplate().sendLocation(message.from);
            }
            else if (strategy == "pizzamenu-taste-03") {
                yield new messageTemplate_1.MessageTemplate().sendLocation(message.from);
            }
            else if (strategy == "pizzamenu-taste-04") {
                yield new messageTemplate_1.MessageTemplate().sendLocation(message.from);
            }
        });
    }
    location(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(message.location);
        });
    }
}
exports.PizzaMenu = PizzaMenu;
_PizzaMenu_params = new WeakMap();
