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
var _StartMenu_params;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartMenu = void 0;
const messageTemplate_1 = require("../classes/message/messageTemplate");
const promises_1 = require("node:fs/promises");
const PizzaMenu_1 = require("./PizzaMenu");
const CacheService_1 = require("../utils/cache/CacheService");
class StartMenu {
    constructor() {
        _StartMenu_params.set(this, void 0);
        let tmp = (0, promises_1.readFile)("build/components/menus/MenuContent/startMenu.json");
        __classPrivateFieldSet(this, _StartMenu_params, tmp, "f");
    }
    send(to) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = JSON.parse((yield __classPrivateFieldGet(this, _StartMenu_params, "f")).toString());
            yield new messageTemplate_1.MessageTemplate().send(to, data.sections, "list", data.header);
        });
    }
    strategy(message, strategy) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (strategy) {
                case "startmenu-pizzas":
                    yield new PizzaMenu_1.PizzaMenu().send(message.from);
                    let instance = new CacheService_1.CacheService();
                    if (instance.existTask(message.from)) {
                        instance.clearTask(message.from);
                        instance.newTask(message.from);
                    }
                    else {
                        instance.newTask(message.from);
                    }
                    break;
                case "startmenu-salgados":
                    break;
                case "startmenu-info":
            }
        });
    }
}
exports.StartMenu = StartMenu;
_StartMenu_params = new WeakMap();
