"use strict";
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
var _CacheService_data;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
exports.taskBodytoString = taskBodytoString;
const CacheInstace_1 = require("./CacheInstace");
class CacheService {
    constructor() {
        _CacheService_data.set(this, void 0);
        __classPrivateFieldSet(this, _CacheService_data, CacheInstace_1.cache, "f");
    }
    getTaskBody(identity) {
        if (this.existTask(identity)) {
            let tmp = __classPrivateFieldGet(this, _CacheService_data, "f").get(identity);
            return tmp.item;
        }
    }
    existTask(identity) {
        return __classPrivateFieldGet(this, _CacheService_data, "f").has(identity);
    }
    newTask(identity) {
        if (!__classPrivateFieldGet(this, _CacheService_data, "f").has(identity)) {
            __classPrivateFieldGet(this, _CacheService_data, "f").set(identity, {
                item: { loc_request: false }
            });
        }
    }
    updateItem(identity, item) {
        if (__classPrivateFieldGet(this, _CacheService_data, "f").has(identity)) {
            let tmp = __classPrivateFieldGet(this, _CacheService_data, "f").take(identity);
            tmp.item = Object.assign(Object.assign({}, tmp.item), item);
            __classPrivateFieldGet(this, _CacheService_data, "f").set(identity, tmp);
        }
    }
    locationRequest(identity) {
        if (!__classPrivateFieldGet(this, _CacheService_data, "f").has(identity)) {
            let tmp = __classPrivateFieldGet(this, _CacheService_data, "f").take(identity);
            tmp.item.loc_request = true;
            __classPrivateFieldGet(this, _CacheService_data, "f").set(identity, tmp);
        }
    }
    clearTask(identity) {
        if (__classPrivateFieldGet(this, _CacheService_data, "f").has(identity)) {
            __classPrivateFieldGet(this, _CacheService_data, "f").del(identity);
        }
    }
}
exports.CacheService = CacheService;
_CacheService_data = new WeakMap();
function taskBodytoString({ task, price }) {
    return `PEDIDO: ${task}\n\nPREÇO: ${price}\n`;
}
