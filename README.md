# i18n-validator
用于检查翻译结果是否符合源字符的规范，比如翻译结果是否正确包含源字符串中的html标签或者变量名称是否正确等

## 安装
- 全局
```
npm install i18n-validator -g
```

- 项目
```
npm install i18n-validator -g
```

## 用法
- 全局安装后
```
i18n-validator -t ./src/lang -s zh-cn -f json
```
- 项目内安装
```
npx i18n-validator -t ./src/lang -s zh-cn -f json
```

**目前只支持JSON格式，需要扩展的童鞋可以基于我这个fork一份修改文件：`src/validator.js` 添加相关格式支持即可**