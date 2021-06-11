"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dirname = exports.existsSync = exports.relative = exports.parse = exports.writeFileSync = exports.hash = exports.join = exports.removeSync = exports.remove = exports.readFileSync = exports.readdirSync = exports.copyFile = exports.copySync = exports.copy = exports.translateJsImports = exports.translateStyleImports = exports.getFullPath = exports.getConfig = exports.replace = exports.replaceExt = exports.isStyle = exports.isJs = exports.isVue = exports.isDemoDir = exports.isTestDir = exports.isDir = exports.isObject = exports.isDef = exports.JS_IMPOPRTS = exports.STYLE_IMPOPRTS = exports.EXT_REGEXP = exports.STYLE_REGEXP = exports.JS_REGEXP = exports.VUE_REGEXP = exports.TEST_REGEXP = exports.DEMO_REGEXP = void 0;
const EXPORT = 'export default {';
const fs_extra_1 = require("fs-extra");
Object.defineProperty(exports, "copy", { enumerable: true, get: function () { return fs_extra_1.copy; } });
Object.defineProperty(exports, "readdirSync", { enumerable: true, get: function () { return fs_extra_1.readdirSync; } });
Object.defineProperty(exports, "removeSync", { enumerable: true, get: function () { return fs_extra_1.removeSync; } });
Object.defineProperty(exports, "remove", { enumerable: true, get: function () { return fs_extra_1.remove; } });
Object.defineProperty(exports, "copySync", { enumerable: true, get: function () { return fs_extra_1.copySync; } });
Object.defineProperty(exports, "copyFile", { enumerable: true, get: function () { return fs_extra_1.copyFile; } });
Object.defineProperty(exports, "readFileSync", { enumerable: true, get: function () { return fs_extra_1.readFileSync; } });
Object.defineProperty(exports, "writeFileSync", { enumerable: true, get: function () { return fs_extra_1.writeFileSync; } });
Object.defineProperty(exports, "existsSync", { enumerable: true, get: function () { return fs_extra_1.existsSync; } });
const path_1 = require("path");
Object.defineProperty(exports, "join", { enumerable: true, get: function () { return path_1.join; } });
Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return path_1.parse; } });
Object.defineProperty(exports, "relative", { enumerable: true, get: function () { return path_1.relative; } });
Object.defineProperty(exports, "dirname", { enumerable: true, get: function () { return path_1.dirname; } });
const hash_sum_1 = __importDefault(require("hash-sum"));
exports.hash = hash_sum_1.default;
exports.DEMO_REGEXP = new RegExp('\\' + path_1.sep + 'demo$');
exports.TEST_REGEXP = new RegExp('\\' + path_1.sep + 'test$');
exports.VUE_REGEXP = new RegExp(/\.vue$/);
exports.JS_REGEXP = new RegExp(/\.(jsx|tsx|ts|js)$/);
exports.STYLE_REGEXP = new RegExp(/\.(less|scss|styl)$/);
exports.EXT_REGEXP = /\.\w+$/;
exports.STYLE_IMPOPRTS = /import\s+(?:"|')[^"']+(\.\w+)(?:"|')(?:$|;|\n)/g;
exports.JS_IMPOPRTS = /import\s+[^'"]+\s+from\s+(?:"|')(?:[^"']+)(\.\w+)("|')(?:$|;|\n)/g;
function isDef(v) {
    return v !== undefined && v !== null;
}
exports.isDef = isDef;
function isObject(v) {
    return Object.prototype.toString.call(v) === '[object Object]';
}
exports.isObject = isObject;
function isDir(path) {
    return fs_extra_1.lstatSync(path).isDirectory();
}
exports.isDir = isDir;
function isTestDir(path) {
    return exports.DEMO_REGEXP.test(path);
}
exports.isTestDir = isTestDir;
function isDemoDir(path) {
    return exports.TEST_REGEXP.test(path);
}
exports.isDemoDir = isDemoDir;
function isVue(path) {
    return path.endsWith('.vue');
}
exports.isVue = isVue;
function isJs(path) {
    return exports.JS_REGEXP.test(path);
}
exports.isJs = isJs;
function isStyle(path) {
    return exports.STYLE_REGEXP.test(path);
}
exports.isStyle = isStyle;
function replaceExt(path, ext) {
    return path.replace(exports.EXT_REGEXP, ext);
}
exports.replaceExt = replaceExt;
function replace(str, fn) {
    return str.replace(EXPORT, () => {
        return fn(EXPORT);
    });
}
exports.replace = replace;
function getConfig(options, path) {
    if (!options || !path)
        return '';
    let tmp = options;
    for (const item of path.split('.')) {
        try {
            if (typeof tmp !== 'object') {
                return undefined;
            }
            tmp = tmp[item];
        }
        catch (e) { // eslint-disable-line
            return undefined;
        }
    }
    return tmp;
}
exports.getConfig = getConfig;
function getFullPath(path) {
    const exts = ['.js', '.json'];
    for (let i = 0; i < exts.length; i++) {
        const fullPath = path + exts[i];
        if (fs_extra_1.existsSync(fullPath)) {
            return fullPath;
        }
    }
    return '';
}
exports.getFullPath = getFullPath;
function translateStyleImports(text) {
    return text.replace(exports.STYLE_IMPOPRTS, (source, match) => source.replace(match, '.css'));
}
exports.translateStyleImports = translateStyleImports;
function translateJsImports(text) {
    return text.replace(exports.JS_IMPOPRTS, (source, str) => source.replace(str, '.js'));
}
exports.translateJsImports = translateJsImports;
