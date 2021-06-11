"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@babel/core");
const common_1 = require("../common");
async function default_1(filepath) {
    let code = common_1.readFileSync(filepath, 'utf8');
    code = common_1.translateStyleImports(code);
    code = common_1.translateJsImports(code);
    const result = core_1.transform(code, {
        filename: filepath
    })?.code;
    if (!result)
        return;
    common_1.removeSync(filepath);
    common_1.writeFileSync(common_1.replaceExt(filepath, '.js'), result);
    return Promise.resolve();
}
exports.default = default_1;
