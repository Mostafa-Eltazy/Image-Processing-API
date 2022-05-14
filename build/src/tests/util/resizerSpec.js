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
Object.defineProperty(exports, "__esModule", { value: true });
const resizer_1 = require("../../util/resizer");
const fs_1 = require("fs");
describe('Test image resizing', () => {
    const filename = 'cat';
    const width = 140;
    const height = 200;
    const expected = function filePresnce() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs_1.promises.readFile(`src/assets/thumb/${filename}-thumb.jpg`);
        });
    };
    it('Checks the output image file is present in assets/thumb', () => __awaiter(void 0, void 0, void 0, function* () {
        const outputFilePath = yield (0, resizer_1.resizer)(filename, height, width);
        expect(expected).toBeDefined();
    }));
});
