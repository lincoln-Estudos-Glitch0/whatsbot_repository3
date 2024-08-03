"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
let cache = new node_cache_1.default({
    maxKeys: 10,
    deleteOnExpire: true,
    stdTTL: 300
});
exports.cache = cache;
