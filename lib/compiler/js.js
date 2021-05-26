"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@babel/core");
const common_1 = require("../common");
async function default_1(filepath) {
    const { base } = common_1.parse(filepath);
    const code = common_1.readFileSync(filepath, 'utf8');
    let result = core_1.transform(code, {
        filename: base
    })?.code;
    if (!result)
        return;
    result = common_1.translateStyleImports(result);
    result = common_1.translateJsImports(result);
    common_1.removeSync(filepath);
    common_1.writeFileSync(common_1.replaceExt(filepath, '.js'), result);
}
exports.default = default_1;
