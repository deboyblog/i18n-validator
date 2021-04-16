#!/usr/bin/env node
const program = require('commander');
const validator = require('../src/validator');
program
    .version(require('../package.json').version)
    .description('用于检查翻译结果是否符合源字符的规范，比如是否正确包含html标签或者变量名称是否正确等')
    .option('-t, --target <path>', 'target dir: ./src/lang')
    .option('-s, --source', 'target language: zh-cn, en-us', 'zh-cn')
    .option('-f, --format', 'i18n file format: json,js,ts', 'json')
    .action(function () {
        validator(program.target, program.source)
    });
program.parse(process.argv);