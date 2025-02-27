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
exports.WebhookController = void 0;
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const startMenu_1 = require("../components/menus/startMenu");
const PizzaMenu_1 = require("../components/menus/PizzaMenu");
const CacheService_1 = require("../components/utils/cache/CacheService");
dotenv_1.default.config();
let route = (0, express_1.Router)();
exports.WebhookController = route;
route.get('/webhook', (req, res) => {
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
route.post('/webhook', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cache = new CacheService_1.CacheService();
        for (let entry of req.body.entry) {
            for (let change of entry.changes) {
                if (change.value && Array.isArray(change.value.messages)) {
                    for (let message of change.value.messages) {
                        if (message.type == 'interactive') {
                            if (message.interactive.type == 'list_reply') {
                                let strategy = message.interactive.list_reply.id;
                                if (strategy.includes('startmenu')) {
                                    yield new startMenu_1.StartMenu().strategy(message, strategy);
                                }
                                else if (strategy.includes('pizzamenu')) {
                                    yield new PizzaMenu_1.PizzaMenu().strategy(message, strategy);
                                }
                            }
                            else if (message.interactive.type == 'button_reply') {
                                let strategy = message.interactive.button_reply.id;
                                if (strategy.includes('confirm')) {
                                    yield new PizzaMenu_1.PizzaMenu().location_strategy(message);
                                }
                                else if (strategy.includes('options')) {
                                    yield new PizzaMenu_1.PizzaMenu().locationAgainStrategy(message);
                                }
                            }
                        }
                        else if (message.type == 'location') {
                            // await new PizzaMenu().location(message)
                        }
                        else {
                            if (cache.existTask(message.from) && message.type == 'text') {
                                if (cache.getTaskBody(message.from).loc_request) {
                                    yield new PizzaMenu_1.PizzaMenu().confirmLocation(message);
                                }
                            }
                            else {
                                yield new startMenu_1.StartMenu().send(message.from);
                            }
                        }
                    }
                }
            }
        }
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
