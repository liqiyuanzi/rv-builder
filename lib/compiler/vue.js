"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const component_compiler_utils_1 = require("@vue/component-compiler-utils");
const templateCompiler = __importStar(require("vue-template-compiler"));
const common_1 = require("../common");
const constant_1 = require("../common/constant");
const js_1 = __importDefault(require("./js"));
const style_1 = __importDefault(require("./style"));
const hasScoped = (styles) => {
    return !!styles.find(item => item.scoped);
};
const createScopedId = (str) => {
    return 'data-v-' + common_1.hash(str);
};
const getVueStylePath = (filePath, ext, index) => {
    return common_1.replaceExt(filePath, `-rbv-vue${index || ''}.${ext}`);
};
function parseVue(filepath) {
    const source = common_1.readFileSync(filepath, 'utf-8');
    return Object.assign(component_compiler_utils_1.parse({
        source,
        needMap: false,
        compiler: templateCompiler
    }), {
        source
    });
}
function parseTemplate(source, filename = '') {
    return component_compiler_utils_1.compileTemplate({
        source,
        filename,
        isProduction: true,
        compiler: templateCompiler
    }).code;
}
function injectCss(script, filepath, len = 0) {
    if (len < 1)
        return script;
    const imports = [];
    for (let i = 0; i < len; i++) {
        const { base } = common_1.parse(getVueStylePath(filepath, 'css', i));
        imports.push(`import './${base}';`);
    }
    imports.join('\n');
    return common_1.replace(script, source => `${imports}\n\n${source}`);
}
function injectScopeId(script, scopeId) {
    return common_1.replace(script, source => `${source}\n  _scopeId: '${scopeId}',\n`);
}
function injectTemplate(script, template) {
    template = template
        .replace('var render', `var ${constant_1.RENDER_FN}`)
        .replace('var staticRenderFns', `var ${constant_1.STATIC_RENDER_FN}`);
    return common_1.replace(script, source => `${template}\n${source}\n  render: ${constant_1.RENDER_FN},\n\n  staticRenderFns: ${constant_1.STATIC_RENDER_FN},\n`);
}
async function default_1(filepath) {
    const tasks = [];
    const { script: content, styles, template, source } = parseVue(filepath);
    const scopeId = hasScoped(styles) ? createScopedId(source) : '';
    let script = content?.content;
    tasks.push(new Promise((resolve) => {
        if (!script) {
            resolve();
            return;
        }
        const jsPath = common_1.replaceExt(filepath, '.js');
        if (template?.content) {
            script = injectTemplate(script, parseTemplate(template.content));
        }
        if (styles.length) {
            script = injectCss(script, filepath, styles.length);
        }
        if (scopeId) {
            script = injectScopeId(script, scopeId);
        }
        common_1.writeFileSync(jsPath, script);
        js_1.default(jsPath).then(resolve, common_1.errorHandler);
    }));
    styles.forEach((style, index) => {
        tasks.push(new Promise((resolve) => {
            let { content: source, scoped, lang } = style; //eslint-disable-line
            const cssPath = getVueStylePath(filepath, lang ?? 'css', index);
            if (scoped) {
                source = component_compiler_utils_1.compileStyle({
                    id: scopeId,
                    scoped: true,
                    trim: true,
                    source,
                    filename: cssPath
                }).code;
            }
            common_1.writeFileSync(cssPath, source);
            style_1.default(cssPath).then(resolve, common_1.errorHandler);
        }));
    });
    tasks.push(common_1.remove(filepath));
    await Promise.all(tasks); //eslint-disable-line
}
exports.default = default_1;
