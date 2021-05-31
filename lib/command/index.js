"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.support = exports.showHelp = exports.clean = exports.buildUmd = exports.buildAmd = exports.buildCjs = exports.buildEsm = void 0;
const compiler_1 = require("../compiler");
const constant_1 = require("../common/constant");
const common_1 = require("../common");
const chalk_1 = __importDefault(require("chalk"));
const watch_1 = __importDefault(require("./watch"));
const setEev = (env) => {
    process.env.RF_BUILDER_ENV = env;
};
function build() {
    common_1.copySync(constant_1.SRC_DIR, constant_1.DIST_DIR);
    compiler_1.compileDir(constant_1.DIST_DIR); // eslint-disable-line
}
function buildEsm() {
    setEev('esm');
    build();
}
exports.buildEsm = buildEsm;
function buildCjs() {
    setEev('cjs');
    build();
}
exports.buildCjs = buildCjs;
function buildAmd() {
    setEev('amd');
    build();
}
exports.buildAmd = buildAmd;
function buildUmd() {
    setEev('umd');
    build();
}
exports.buildUmd = buildUmd;
function clean() {
    if (!common_1.existsSync(constant_1.DIST_DIR))
        return;
    common_1.remove(constant_1.DIST_DIR); // eslint-disable-line
}
exports.clean = clean;
function showHelp() {
    console.log(` 
    ${chalk_1.default.green('yarn rvb --command')}
    ${chalk_1.default.red('e.g.')}
    build esmodule: ${chalk_1.default.blue('yarn rvb --esm or yarn rvb -e')}
    build commonjs: ${chalk_1.default.blue('yarn rvb --cjs or yarn rvb -c')}
    build umd: ${chalk_1.default.blue('yarn rvb --umd or yarn rvb -u')}
    build amd: ${chalk_1.default.blue('yarn rvb --amd or yarn rvb -a')}
    clean dist: ${chalk_1.default.blue('yarn rvb --clean or yarn rvb -cl')}
    `);
}
exports.showHelp = showHelp;
exports.support = {
    'watch': watch_1.default,
    'esm': buildEsm,
    'cjs': buildCjs,
    'amd': buildAmd,
    'umd': buildUmd,
    'clean': clean,
    'help': showHelp
};
