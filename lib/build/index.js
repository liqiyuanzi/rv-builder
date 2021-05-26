"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.support = exports.buildCjs = exports.buildEsm = void 0;
const compiler_1 = require("../compiler");
const constant_1 = require("../common/constant");
const common_1 = require("../common");
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
exports.support = {
    'esm': buildEsm,
    'cjs': buildCjs
};
