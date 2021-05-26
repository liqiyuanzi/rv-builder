"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileDir = void 0;
const vue_1 = __importDefault(require("./vue"));
const js_1 = __importDefault(require("./js"));
const style_1 = __importDefault(require("./style"));
const common_1 = require("../common");
async function compileFile(filepath) {
    if (common_1.isVue(filepath))
        return vue_1.default(filepath);
    if (common_1.isJs(filepath))
        return js_1.default(filepath);
    if (common_1.isStyle(filepath))
        return style_1.default(filepath);
}
async function compileDir(dir) {
    const files = common_1.readdirSync(dir);
    await Promise.all(files.map(async (path) => {
        const filepath = common_1.join(dir, path);
        if (common_1.isDemoDir(filepath) || common_1.isTestDir(filepath))
            return common_1.remove(filepath);
        if (common_1.isDir(filepath))
            return compileDir(filepath);
        return compileFile(filepath);
    }));
}
exports.compileDir = compileDir;
