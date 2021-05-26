"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const build_1 = require("./build");
const alias_1 = __importDefault(require("./alias"));
const program = new commander_1.default.Command();
const shouldBuildAll = (obj) => {
    return Object.keys(obj).length === 0;
};
alias_1.default();
program
    .option('-e, --esm')
    .option('-u, --umd')
    .option('-c, --cjs')
    .action((options) => {
    for (let type in build_1.support) {
        (shouldBuildAll(options)
            || options[type])
            && build_1.support[type].call(null);
    }
}).parse();
