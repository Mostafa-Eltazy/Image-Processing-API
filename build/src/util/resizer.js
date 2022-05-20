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
exports.resizer = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const dir = path_1.default.join(__dirname, '../../src/assets/full');
//thumbnail directory
const thumbDir = path_1.default.join(__dirname, '../../src/assets/thumb');
function resizer(name, height, width) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(dir);
        try {
            yield (0, sharp_1.default)(`${dir}/${name}.jpg`)
                .resize(width, height)
                .toFile(`${thumbDir}/${name}-thumb.jpg`);
        }
        catch (error) {
            console.log('The Image was not found to be resized');
        }
    });
}
exports.resizer = resizer;
