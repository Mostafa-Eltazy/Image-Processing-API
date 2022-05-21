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
const fs_2 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const resizer_1 = require("../../util/resizer");
const imageRoute = express_1.default.Router();
const dir = path_1.default.join(__dirname, '../../assets/full');
const thumbDir = path_1.default.join(__dirname, '../../assets/thumb');
imageRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const properHeightValue = req.query.height &&
        Number(req.query.height) > 0 &&
        !Number.isNaN(Number(req.query.height));
    const properWidthValue = req.query.width &&
        Number(req.query.width) > 0 &&
        !Number.isNaN(Number(req.query.width));
    console.log(properHeightValue, properWidthValue);
    const completeData = req.query.name && properHeightValue && properWidthValue;
    if (!properWidthValue) {
        return res.status(400).send('invalid Width!');
    }
    if (!properHeightValue) {
        return res.status(400).send('invalid Height!');
    }
    // if data is complete, acess the values from the url
    if (completeData) {
        const name = req.query.name;
        const width = Number(req.query.width);
        const height = Number(req.query.height);
        //chech if the Tumb folder is present in the build, else create it
        if (!fs_2.default.existsSync(thumbDir)) {
            yield fs_2.default.promises.mkdir(thumbDir);
        }
        // check if file is present in the thumb output directory
        try {
            const thumbImage = yield fs_1.promises.readFile(`${thumbDir}/${name}-thumb.jpg`);
            return res.status(200).end(thumbImage);
        }
        catch (err) {
            console.log('Image has not been resized before, resizing in progress');
        }
        // call the resizer function to accept data and output the result in the output directory
        try {
            yield (0, resizer_1.resizer)(name, width, height);
        }
        catch (err) {
            return res.status(500).send('Image failed to resize!');
        }
        // fetch the image from the thumbs directory to send to user
        try {
            const newThumbImg = yield fs_1.promises.readFile(`${thumbDir}/${name}-thumb.jpg`);
            return res.status(200).end(newThumbImg);
        }
        catch (err) {
            res.status(500).send('Something Went Wrong !!');
        }
    }
    else
        return res.status(400).send('Invalid user input');
}));
exports.default = imageRoute;
