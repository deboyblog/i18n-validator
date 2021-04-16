const { listFilesSync } = require('list-files-in-dir');
const path = require("path");
const fs = require("fs");
const chalk = require('chalk');
const flatten = require('flat');
const { detect } = require('./utils/helper');
const log = console.log;
let mode = 'dir'; // directory file
module.exports = function (target, source = 'zh-cn', format = 'json') {
    if (!target || typeof target !== 'string') {
        log(chalk.red(`请指定需要检查的国际化目录`))
        return;
    }
    if (!source || typeof source !== 'string') {
        log(chalk.red(`请指定源字符串文件 如：zh-cn`))
        return;
    }
    target = path.resolve(process.cwd(), target);
    log(chalk.green(`
Target: ${target}
Source: ${source}
`));
    log(chalk.green('Start to translate...'));
    const files = listFilesSync(target);
    let sourceFileContent = null
    const i18nFileMap = {}
    files.forEach((file) => {
        const lang = file.replace(target, '').replace(`.${format}`, '').replace('/', '')
        const fileContent = JSON.parse(fs.readFileSync(file).toString());
        if (lang !== source) {
            i18nFileMap[lang] = fileContent
        } else {
            sourceFileContent = fileContent
        }
    })
    const sourceMap = flatten(sourceFileContent)
    const detectMap = {}
    Object.keys(sourceMap).forEach((key) => {
        // 把检测到需要校验的html标签，变量等记录下来
        const detectResult = detect(sourceMap[key])
        if (detectResult.length > 0) {
            detectMap[key] = detectResult
        }
    })
    // 一个个语言遍历上面检测出来的检查项目，不符合规范的就输出
    Object.keys(i18nFileMap).map((lang) => {
        const data = flatten(i18nFileMap[lang])
        const langErrorMap = {}
        Object.keys(detectMap).map((key) => {
            detectMap[key].forEach(item => {
                // 有值才检查，没有翻译的不检查
                if (data[key] && data[key].indexOf(item) < 0) {
                    if (!langErrorMap[key]) {
                        langErrorMap[key] = [item]
                    } else {
                        langErrorMap[key].push(item)
                    }
                }
            });
            langErrorMap[key] = langErrorMap[key] && langErrorMap[key].join(',')
        })
        console.log(`${lang} 异常如下\n`, JSON.stringify(langErrorMap, null, 4))
    })
};