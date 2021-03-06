#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const command_1 = require("./command");
const program = new commander_1.default.Command();
const shouldBuildAll = (obj) => {
    return Object.keys(obj).length === 0;
};
program
    .option('-w, --watch')
    .option('-e, --esm')
    .option('-a, --amd')
    .option('-u, --umd')
    .option('-c, --cjs')
    .option('-cl, --clean')
    .option('-h, --help')
    .action(async (options) => {
    const supports = shouldBuildAll(options) ? command_1.buildSupport : options;
    for (const type in supports) {
        await command_1.support[type].call(null); //eslint-disable-line
    }
}).parse();
