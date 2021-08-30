"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showHelp = exports.clean = exports.buildUmd = exports.buildCjs = exports.buildEsm = exports.support = exports.buildSupport = void 0;
const compiler_1 = require("../compiler");
const alias_1 = __importDefault(require("../alias"));
const bundle_1 = __importDefault(require("../bundle"));
const constant_1 = require("../common/constant");
const common_1 = require("../common");
const chalk_1 = __importDefault(require("chalk"));
const watch_1 = __importDefault(require("./watch"));
exports.buildSupport = {
    'esm': buildEsm,
    'cjs': buildCjs,
    'umd': buildUmd
};
exports.support = Object.assign({
    'watch': watch_1.default,
    'clean': clean,
    'help': showHelp
}, exports.buildSupport);
async function build() {
    common_1.copySync(constant_1.getSrcDir(), constant_1.getDistDir());
    alias_1.default();
    return compiler_1.compileDir(constant_1.getDistDir());
}
async function buildEsm() {
    common_1.setEev('esm');
    return build();
}
exports.buildEsm = buildEsm;
async function buildCjs() {
    common_1.setEev('cjs');
    return build();
}
exports.buildCjs = buildCjs;
async function buildUmd() {
    common_1.setEev('umd');
    return build().then(bundle_1.default).then((outputName) => {
        if (!outputName)
            return;
        const dist = constant_1.getDistDir('umd');
        const tmp = '__rvb__tmp.js';
        const path = common_1.join(dist, outputName);
        const tmpDist = common_1.join(dist, '../', tmp);
        if (!common_1.existsSync(path))
            return;
        common_1.copySync(path, tmpDist);
        common_1.removeSync(dist);
        common_1.copySync(tmpDist, path);
        common_1.removeSync(tmpDist);
    });
}
exports.buildUmd = buildUmd;
function clean() {
    const cleanList = Object.assign(exports.buildSupport, {
        [constant_1.DIST_DIR]: true
    });
    for (const i in cleanList) {
        if (common_1.existsSync(constant_1.getDistDir(i))) {
            common_1.removeSync(constant_1.getDistDir(i));
        }
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
    clean dist: ${chalk_1.default.blue('yarn rvb --clean or yarn rvb -cl')}
    watch: ${chalk_1.default.blue('yarn rvb --watch or yarn rvb -w')}
    `);
}
exports.showHelp = showHelp;
