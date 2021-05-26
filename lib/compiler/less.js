"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const less_1 = require("less");
const common_1 = require("../common");
async function default_1(filepath) {
    const source = common_1.readFileSync(filepath, 'utf-8');
    const { css } = await less_1.render(source, {
        filename: filepath
    });
    return css;
}
exports.default = default_1;
