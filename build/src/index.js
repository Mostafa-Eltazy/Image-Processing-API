"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myFunc = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../src/routes/index"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/', index_1.default);
app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
const myFunc = (x) => {
    return x * x;
};
exports.myFunc = myFunc;
exports.default = app;
