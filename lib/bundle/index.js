"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../common/constant");
const index_1 = require("../common/index");
const webpack_1 = __importDefault(require("webpack"));
const webpack_config_1 = __importDefault(require("./webpack.config"));
function getConfig(path) {
    return constant_1.getSourceDir(index_1.getEev() + '.' + path);
}
;
function getDist() {
    return index_1.join(constant_1.ROOT_DIR, getConfig('dist'));
}
async function bundle() {
    const entry = constant_1.translate(getConfig('entry'));
    if (!entry)
        return Promise.resolve();
    return new Promise((resolve) => {
        webpack_1.default(webpack_config_1.default({
            entry,
            dist: getDist(),
            minify: getConfig('minify'),
            name: getConfig('name'),
            webpack: constant_1.getSourceDir('webpack')
        }), (error, stats) => {
            if (error) {
                console.log('webpack_error:', error);
            }
            console.log(stats?.toString({
                colors: true
            }));
        }).run(() => {
            resolve();
        });
    });
}
exports.default = bundle;
