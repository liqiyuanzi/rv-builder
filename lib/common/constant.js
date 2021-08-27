"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistDir = exports.getSrcDir = exports.translate = exports.DIST_DIR = exports.SRC_DIR = exports.ROOT_DIR = exports.getSourceDir = exports.STATIC_RENDER_FN = exports.RENDER_FN = exports.BASE_FILE = void 0;
const index_1 = require("./index");
exports.BASE_FILE = 'rv.config';
exports.RENDER_FN = '__vue_render__';
exports.STATIC_RENDER_FN = '__vue_staticRenderFns__';
const CWD = process.cwd();
const getBaseConfig = (dir = CWD) => {
    return index_1.getFullPath(index_1.join(dir, exports.BASE_FILE));
};
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
const getSourceDir = (path) => {
    return index_1.getConfig(getRVConfig(), path); //eslint-disable-line
};
exports.getSourceDir = getSourceDir;
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
exports.ROOT_DIR = getRootDir(CWD);
exports.SRC_DIR = exports.getSourceDir('src');
exports.DIST_DIR = exports.getSourceDir('dist');
const translate = (str) => {
    if (!str)
        return '';
    const dirName = exports.getSourceDir(index_1.getEev() ? index_1.getEev() + '.dist' : exports.DIST_DIR);
    return str.replace(/\[dist\]/g, dirName);
};
exports.translate = translate;
const getSrcDir = (type = index_1.getEev()) => {
    return index_1.join(CWD, exports.translate(exports.getSourceDir(type + '.src')) || exports.SRC_DIR);
};
exports.getSrcDir = getSrcDir;
const getDistDir = (type = index_1.getEev()) => {
    return index_1.join(CWD, exports.translate(exports.getSourceDir(type + '.dist')) || exports.DIST_DIR);
};
exports.getDistDir = getDistDir;
