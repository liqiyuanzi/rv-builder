"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const less_1 = require("less");
const common_1 = require("../common");
async function default_1(filepath) {
    const source = common_1.readFileSync(filepath, 'utf-8');
    try {
        const { css } = await less_1.render(source, {
            filename: filepath,
            syncImport: true
        });
        return css;
    }
    catch (e) {
        console.log('err:', e);
        return '';
    }
}
exports.default = default_1;
