# commit-rule-cli

一键安装 git-commit 提交 Angular 提交信息规范, 您将遵循[Angular 规范](https://zj-git-guide.readthedocs.io/zh_CN/latest/message/Angular%E6%8F%90%E4%BA%A4%E4%BF%A1%E6%81%AF%E8%A7%84%E8%8C%83/)

## 一键安装

```sh
npx commit-rule-cli
```

## 如何进行 git commit

1. 您应该使用`npm run commit`来提交符合规范的 commit-msg
2. 安装 commit-rule-cli 后，将不再允许提交不符合规范的 commit-msg，如`git commit -m "init"`将会报错阻止您的 commit

## 详情

此工具将为您自动安装/配置以下工具来实现这套规范

- commitizen 信息交互工具
- @commitlint-cli 信息校验工具
- @commitlint-config-conventional 信息校验工具常规配置
- husky git-hook 工具
