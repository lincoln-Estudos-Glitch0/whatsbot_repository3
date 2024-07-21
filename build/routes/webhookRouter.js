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
exports.WebhookCOntroller = void 0;
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const startMenu_1 = require("../components/menus/startMenu");
const PizzaMenu_1 = require("../components/menus/PizzaMenu");
dotenv_1.default.config();
let route = (0, express_1.Router)();
exports.WebhookCOntroller = route;
route.get('webhook/', (req, res) => {
    let mode = req.query['hub.mode'];
    let challenge = req.query['hub.challenge'];
    let token = req.query["hub.verify_token"];
    if (mode && token) {
        if (mode == 'subscribe' && token == process.env.SEC_TOKEN) {
            return res.status(200).send(challenge);
        }
        return res.sendStatus(403);
    }
});
route.post('webhook/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    for (let entry of req.body.entry) {
        for (let change of entry.changes) {
            for (let message of change.value.messages) {
                if (message.type == 'list_reply') {
                    let strategy = message.interactive.list_reply.id;
                    if (strategy.includes('startmenu')) {
                        yield new startMenu_1.StartMenu().strategy(message, strategy);
                    }
                    else if (strategy.includes('pizzamenu')) {
                        yield new PizzaMenu_1.PizzaMenu().strategy(message, strategy);
                    }
                }
                else if (message.type == 'location') {
                    yield new PizzaMenu_1.PizzaMenu().location(message);
                }
                else {
                    yield new startMenu_1.StartMenu().send(message.from);
                }
            }
        }
    }
}));
