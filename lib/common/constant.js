"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIST_DIR = exports.SRC_DIR = exports.ROOT_DIR = exports.getSourceDir = exports.STATIC_RENDER_FN = exports.RENDER_FN = exports.BASE_FILE = void 0;
const CWD = process.cwd();
const index_1 = require("./index");
exports.BASE_FILE = 'rv.config';
exports.RENDER_FN = '__vue_render__';
exports.STATIC_RENDER_FN = '__vue_staticRenderFns__';
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
    return index_1.getConfig(getRVConfig(), path) || index_1.join(exports.ROOT_DIR, path); // eslint-disable-line
};
exports.getSourceDir = getSourceDir;
exports.ROOT_DIR = getRootDir(CWD);
exports.SRC_DIR = exports.getSourceDir('src');
exports.DIST_DIR = exports.getSourceDir('dist');
