"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producer = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_FACTOR = 10;
const ProducerSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    title: { type: String, required: false },
    password: { type: String, required: true },
});
//hook
ProducerSchema.pre('save', function (next) {
    const producer = this;
    //hash password
    bcrypt_1.default.genSalt(SALT_FACTOR, (error, salt) => {
        if (error) {
            return next(error);
        }
        bcrypt_1.default.hash(producer.password, salt, (err, encrypted) => {
            if (err) {
                return next(err);
            }
            producer.password = encrypted;
            next();
        });
    });
});
ProducerSchema.methods.comparePassword = function (candidatePassword, callback) {
    const producer = this;
    bcrypt_1.default.compare(candidatePassword, producer.password, (error, isMatch) => {
        if (error) {
            callback(error, false);
        }
        callback(null, isMatch);
    });
};
exports.Producer = mongoose_1.default.model('Producer', ProducerSchema);
