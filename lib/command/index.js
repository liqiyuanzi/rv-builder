"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.support = exports.buildSupport = exports.showHelp = exports.clean = exports.buildUmd = exports.buildAmd = exports.buildCjs = exports.buildEsm = void 0;
const compiler_1 = require("../compiler");
const constant_1 = require("../common/constant");
const common_1 = require("../common");
const chalk_1 = __importDefault(require("chalk"));
const watch_1 = __importDefault(require("./watch"));
const setEev = (env) => {
    process.env.RF_BUILDER_ENV = env;
};
async function build(src = constant_1.SRC_DIR, dist = constant_1.DIST_DIR) {
    common_1.copySync(src, dist);
    return compiler_1.compileDir(dist);
}
async function buildEsm() {
    setEev('esm');
    return build(constant_1.ESM_SRC_DIR, constant_1.ESM_DIST_DIR);
}
exports.buildEsm = buildEsm;
async function buildCjs() {
    setEev('cjs');
    return build(constant_1.CJS_SRC_DIR, constant_1.CJS_DIST_DIR);
}
exports.buildCjs = buildCjs;
async function buildAmd() {
    setEev('amd');
    return build(constant_1.AMD_SRC_DIR, constant_1.AMD_DIST_DIR);
}
exports.buildAmd = buildAmd;
async function buildUmd() {
    setEev('umd');
    return build(constant_1.UMD_SRC_DIR, constant_1.UMD_DIST_DIR);
}
exports.buildUmd = buildUmd;
function clean() {
    if (common_1.existsSync(constant_1.DIST_DIR)) {
        common_1.removeSync(constant_1.DIST_DIR);
    }
    if (common_1.existsSync(constant_1.AMD_DIST_DIR)) {
        common_1.removeSync(constant_1.AMD_DIST_DIR);
    }
    if (common_1.existsSync(constant_1.CJS_DIST_DIR)) {
        common_1.removeSync(constant_1.CJS_DIST_DIR);
    }
    if (common_1.existsSync(constant_1.UMD_DIST_DIR)) {
        common_1.removeSync(constant_1.UMD_DIST_DIR);
    }
    if (common_1.existsSync(constant_1.ESM_DIST_DIR)) {
        common_1.removeSync(constant_1.ESM_DIST_DIR);
    }
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
exports.buildSupport = {
    'esm': buildEsm,
    'cjs': buildCjs,
    'amd': buildAmd,
    'umd': buildUmd
};
exports.support = Object.assign({
    'watch': watch_1.default,
    'clean': clean,
    'help': showHelp
}, exports.buildSupport);
