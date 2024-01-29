# git-newtag

这是一个简单的根据指定规则自动打tag的工具

_自动生成 release-online-2023-04-19-v1 这种tag，“release-online”和“v”都可以自定义，“2023-04-19”是当前日期，会根据已有的tag生成对应的日期，“v”后面是自动生成的版本数_

# 安装

-  [npm](https://npmjs.org): `npm install git-newtag -D`
-  [yarn](https://yarnpkg.com): `yarn add git-newtag -D`

# 使用

在终端的项目根目录中直接执行 `npx nt` 或者在package.json的"scripts"字段中添加如下命令：

（nt 是 new tag 的意思，如果命令冲突了也可以使用 git-nt 或 newtag）

```json
{
  "scripts": {
    "nt": "nt",
    "nt:msg": "nt 这是tag的message"
  }
}
```

# 配置

在根目录添加 `nt.config.js` 文件，代码如下：

```js
module.exports = {
    tagHead: "release-online",
    versionName: 'v'
}
```

`nt.config.js` 文件导出的对象配置如下：

| 参数   | 说明    | 类型    | 是否必须 | 说明 |
| ------ | ------------ | --------- | --- | --- |
| tagHead   | tag开头的字符   | string   |  是  |  无  |
| versionName | version字符 | string  |  是  |  无  |
| tagMessage | 打tag添加的message | string | 否 |  如果配置了此选项则优先使用，否则寻找命令行后面的参数  |
