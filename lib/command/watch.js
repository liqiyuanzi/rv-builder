"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar_1 = __importDefault(require("chokidar"));
const compiler_1 = require("../compiler");
const constant_1 = require("../common/constant");
const common_1 = require("../common");
const chalk_1 = __importDefault(require("chalk"));
const fileChange = (path) => {
    const distPath = path.replace(constant_1.SRC_DIR, constant_1.DIST_DIR);
    common_1.copySync(path, distPath);
    compiler_1.compileFile(distPath); //eslint-disable-line
};
const addDir = (path) => {
    common_1.copySync(path, constant_1.DIST_DIR);
    compiler_1.compileDir(path); //eslint-disable-line
};
const removeFile = (path) => {
    const distPath = common_1.dirname(path.replace(constant_1.SRC_DIR, constant_1.DIST_DIR));
    const srcPath = common_1.dirname(path);
    common_1.removeSync(distPath);
    common_1.copySync(srcPath, distPath);
    compiler_1.compileDir(distPath); //eslint-disable-line
};
function watch() {
    chokidar_1.default.watch(constant_1.SRC_DIR, { ignoreInitial: true }).on('all', (eventName, path) => {
        console.log(`${chalk_1.default.green(eventName)}: ${path}`);
        const eventHandlers = {
            'addDir': addDir,
            'unlinkDir': removeFile,
            'add': fileChange,
            'change': fileChange,
            'unlink': removeFile
        };
        if (eventName in eventHandlers) {
            eventHandlers[eventName].call(null, path);
        }
    });
}
exports.default = watch;
