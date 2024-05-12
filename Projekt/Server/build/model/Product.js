"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    producer: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: String, required: false },
    origin: { type: String, required: true },
    preorder: { type: String, required: false },
    delivery: { type: String, required: false },
    availability: { type: String, required: false },
    discount: { type: String, required: false }
});
exports.Product = mongoose_1.default.model('Product', ProductSchema);
