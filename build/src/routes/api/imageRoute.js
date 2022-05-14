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
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const resizer_1 = require("../../util/resizer");
const imageRoute = express_1.default.Router();
imageRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const properHeightValue = req.query.height &&
        Number(req.query.height) > 0 &&
        !Number.isNaN(Number(req.query.height));
    const properWidthValue = req.query.width &&
        Number(req.query.width) > 0 &&
        !Number.isNaN(Number(req.query.width));
    const completeData = req.query.name && properHeightValue && properWidthValue;
    if (completeData) {
        // if data is complete, acess the values from the url
        const name = req.query.name;
        const width = Number(req.query.width);
        const height = Number(req.query.height);
        try {
            // call the resizer function to accept data and output the result in the output directory
            yield (0, resizer_1.resizer)(name, width, height);
            const inputFile = yield fs_1.promises.readFile(`src/assets/thumb/${req.query.name}.jpg`);
            // return thumb image to the browser
            res.status(200).end(inputFile);
        }
        catch (err) {
            res.status(500).send('Something went wrong!');
        }
    }
    else
        res.status(400).send('Invalid user input');
}));
exports.default = imageRoute;
