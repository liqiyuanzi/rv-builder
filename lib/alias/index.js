"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const constant_1 = require("../common/constant");
const setAlias = (config) => {
    process.env.RF_BUILDER_ALIAS = config;
};
function alias() {
    const config = constant_1.getSourceDir('alias');
    if (!common_1.isObject(config)) {
        setAlias('');
        return;
    }
    setAlias(constant_1.translate(JSON.stringify(config)));
}
exports.default = alias;
