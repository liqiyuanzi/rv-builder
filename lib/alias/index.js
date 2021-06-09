"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const constant_1 = require("../common/constant");
const command_1 = require("../command");
const setAlias = (config) => {
    process.env.RF_BUILDER_ALIAS = config;
};
const translate = (str) => {
    const dirName = constant_1.getSourceDir(command_1.getEev() ? command_1.getEev() + '.dist' : constant_1.DIST_DIR);
    return str.replace(/\{dist_dir\}/g, dirName);
};
function alias() {
    const config = constant_1.getSourceDir('alias');
    if (!common_1.isObject(config)) {
        setAlias('');
        return;
    }
    setAlias(translate(JSON.stringify(config)));
}
exports.default = alias;
