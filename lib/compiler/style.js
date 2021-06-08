"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const less_1 = __importDefault(require("./less"));
const common_1 = require("../common");
const compilersMaps = {
    '.less': less_1.default
};
async function compileFile(filePath) {
    const parsedPath = path_1.parse(filePath);
    const { ext } = parsedPath;
    if (ext in compilersMaps) {
        const result = await compilersMaps[ext].call(null, filePath);
        return result;
    }
    return '';
}
async function compileStyle(filePath) {
    const css = await compileFile(filePath);
    common_1.writeFileSync(common_1.replaceExt(filePath, '.css'), css);
}
exports.default = compileStyle;
