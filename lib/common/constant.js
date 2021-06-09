"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AMD_DIST_DIR = exports.AMD_SRC_DIR = exports.UMD_DIST_DIR = exports.UMD_SRC_DIR = exports.CJS_DIST_DIR = exports.CJS_SRC_DIR = exports.ESM_DIST_DIR = exports.ESM_SRC_DIR = exports.DIST_DIR = exports.SRC_DIR = exports.ROOT_DIR = exports.getSourceDir = exports.STATIC_RENDER_FN = exports.RENDER_FN = exports.BASE_FILE = void 0;
const index_1 = require("./index");
exports.BASE_FILE = 'rv.config';
exports.RENDER_FN = '__vue_render__';
exports.STATIC_RENDER_FN = '__vue_staticRenderFns__';
const CWD = process.cwd();
/* eslint-disable */
const getRVConfig = () => {
    try {
        return require(getBaseConfig());
    }
    catch (err) {
        return '';
    }
};
/* eslint-enable */
const getBaseConfig = (dir = CWD) => {
    return index_1.getFullPath(index_1.join(dir, exports.BASE_FILE));
};
const getRootDir = (dir) => {
    if (getBaseConfig(dir)) {
        return dir;
    }
    const parentDir = index_1.dirname(dir);
    if (dir === parentDir) {
        return dir;
    }
    return getRootDir(parentDir);
};
const getSourceDir = (path) => {
    return index_1.getConfig(getRVConfig(), path); //eslint-disable-line
};
exports.getSourceDir = getSourceDir;
exports.ROOT_DIR = getRootDir(CWD);
exports.SRC_DIR = exports.getSourceDir('src');
exports.DIST_DIR = exports.getSourceDir('dist');
exports.ESM_SRC_DIR = exports.getSourceDir('esm.src') || exports.SRC_DIR;
exports.ESM_DIST_DIR = exports.getSourceDir('esm.dist') || exports.DIST_DIR;
exports.CJS_SRC_DIR = exports.getSourceDir('cjs.src') || exports.SRC_DIR;
exports.CJS_DIST_DIR = exports.getSourceDir('cjs.dist') || exports.DIST_DIR;
exports.UMD_SRC_DIR = exports.getSourceDir('umd.src') || exports.SRC_DIR;
exports.UMD_DIST_DIR = exports.getSourceDir('umd.dist') || exports.DIST_DIR;
exports.AMD_SRC_DIR = exports.getSourceDir('amd.src') || exports.SRC_DIR;
exports.AMD_DIST_DIR = exports.getSourceDir('amd.dist') || exports.DIST_DIR;
