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
const startMenu_1 = require("./startMenu");
const promises_1 = require("node:fs/promises");
const CacheService_1 = require("../utils/cache/CacheService");
const coordanateService_1 = require("../utils/coordanateService");
class PizzaMenu {
    constructor() {
        _PizzaMenu_params.set(this, void 0);
        __classPrivateFieldSet(this, _PizzaMenu_params, (0, promises_1.readFile)('build/components/menus/MenuContent/pizzaMenu.json'), "f");
    }
    send(to) {
        return __awaiter(this, void 0, void 0, function* () {
            let tmp = JSON.parse((yield __classPrivateFieldGet(this, _PizzaMenu_params, "f")).toString());
            yield new messageTemplate_1.MessageTemplate().send(to, tmp.sections, "list", tmp.header, tmp.body);
        });
    }
    strategy(message, strategy) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cache = new CacheService_1.CacheService();
                if (cache.existTask(message.from)) {
                    let data = cache.getTaskBody(message.from);
                    let title = JSON.parse((yield __classPrivateFieldGet(this, _PizzaMenu_params, "f")).toString());
                    let price = title.sections[0].rows.filter((el) => el.id == strategy)[0].description;
                    title = title.sections[0].rows.filter((el) => el.id == strategy)[0].title;
                    data.task = title;
                    data.price = price;
                    cache.updateItem(message.from, data);
                }
                else {
                    cache.newTask(message.from);
                    let data = cache.getTaskBody(message.from);
                    let title = JSON.parse((yield __classPrivateFieldGet(this, _PizzaMenu_params, "f")).toString());
                    title = title.sections[0].rows.filter((el) => el.id == strategy)[0].title;
                    data.task = title;
                    cache.updateItem(message.from, data);
                }
                const text = 'Escreva o endereço para a entrega, por favor:';
                yield new messageTemplate_1.MessageTemplate().sendText(message.from, text);
                cache.locationRequest(message.from);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    confirmLocation(message) {
        return __awaiter(this, void 0, void 0, function* () {
            let searching_location = (yield new coordanateService_1.CoordenateService().getCoordenate(message.text.body)).data[0];
            let buttons = yield (0, promises_1.readFile)('build/components/menus/MenuContent/locationButton.json');
            buttons = JSON.parse(buttons.toString());
            buttons = buttons.buttons;
            let header = {
                type: 'text',
                text: 'Confirmação de endereço'
            };
            let address = searching_location.display_name;
            address = address.split(',').slice(0, 4).join(',');
            let body = {
                text: `Endereço: ${address}`
            };
            let messageTemplate = new messageTemplate_1.MessageTemplate();
            yield messageTemplate.sendLocation(message.from, searching_location.lat, searching_location.lon, searching_location.display_name);
            yield messageTemplate.send(message.from, buttons, 'button', header, body);
        });
    }
    location_strategy(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.interactive.button_reply.id == 'location-confirm-yes') {
                let cache = new CacheService_1.CacheService();
                let identity = message.from;
                if (cache.existTask(identity)) {
                    if (cache.getTaskBody(identity).loc_request) {
                        cache.updateItem(identity, { loc_request: false });
                        let message = (0, CacheService_1.taskBodytoString)(cache.getTaskBody(identity));
                        yield new messageTemplate_1.MessageTemplate().sendText(identity, message);
                        cache.clearTask(identity);
                    }
                }
            }
            else if (message.interactive.button_reply.id == 'location-confirm-no') {
                let cache = new CacheService_1.CacheService();
                let identity = message.from;
                if (cache.existTask(identity)) {
                    if (cache.getTaskBody(identity).loc_request) {
                        let buttons = (yield (0, promises_1.readFile)('build/components/menus/MenuContent/locationButton.json')).toString();
                        buttons = JSON.parse(buttons).send_loc_again;
                        const text = 'Quer tentar novamente digitar o endereço ? Ou apenas cancelar o pedido?';
                        yield new messageTemplate_1.MessageTemplate().send(identity, buttons, 'button', false, { text: text });
                    }
                }
            }
        });
    }
    locationAgainStrategy(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.interactive.button_reply.id == 'location-confirm-again') {
                let cache = new CacheService_1.CacheService();
                const text = 'Escreva o endereço para a entrega, por favor:';
                if (cache.existTask(message.from)) {
                    yield new messageTemplate_1.MessageTemplate().sendText(message.from, text);
                    cache.locationRequest(message.from);
                }
            }
            else if (message.interactive.button_reply.id == 'location-confirm-cancel') {
                let cache = new CacheService_1.CacheService();
                cache.clearTask(message.from);
                yield new startMenu_1.StartMenu().send(message.from);
            }
        });
    }
}
exports.PizzaMenu = PizzaMenu;
_PizzaMenu_params = new WeakMap();
