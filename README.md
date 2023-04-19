# git-newtag

这是一个简单的根据指定规则自动打tag的工具

# 安装

-  [npm](https://npmjs.org): `npm install git-newtag -D`
-  [yarn](https://yarnpkg.com): `yarn add git-newtag -D`

# 配置

在根目录添加 `nt.config.js` 文件，代码如下：

```js
module.exports = {
    tagHead: "release-online",
    versionName: 'v'
}
```
