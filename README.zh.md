# myshell

用于快速提交代码和收录自定义运行脚本

简体中文 | [English](./README.md)

## 重大更新✨✨

### 远端脚本的使用🚀

支持使用`ms add [module]`来下载远端脚本到本地进行使用，例如：

```sh
ms add git-branch-util # 添加 ms-ecology/git-branch-util 中的脚本至本地
# 随后可以使用 ms cfb <branch-name> 进行分支的创建等功能
```

若需要移除不使用的远端库，也可以使用 `ms remove [module]` 来进行卸载，例如：

```sh
ms remove git-branch-util # 移除该模块提供的所有脚本
```

当然也可以使用原有的 `ms template` 能力，这种方式针对某些不使用的脚本进行单个的删除：

```sh
ms template -D cfb # 该命令只会删除 cfb 命令，对于模块提供的其他命令依旧会保留
# 但请注意其中依赖问题，例如在git-branch-util中，cfb是基于feature的，当删除feature之后，cfb相应的也会执行出错
```

### 如何安装远端脚本📚

在组织`ms-ecology`中，创建的仓库可直接被**myshell**进行下载，例如[git-branch-util](https://github.com/ms-ecology/git-branch-util)，若想添加该仓库中的代码，只需：

```sh
ms add git-branch-util # 该命令会自动去组织ms-ecology下进行搜寻并下载
```

也可以对外部仓库脚本进行下载：

```sh
# ms add <github-username/repo-name>
ms add ms-ecology/number-game # 可填写 full path 进行下载，目前只支持github，gitlab等后续会考虑支持
```

### 开发远端脚本🔧

**myshell**的远端脚本基于github，只需要新建一个仓库即可作为**myshell**远端下载的源。

但请注意，仓库的根目录必须拥有 `config.json` 文件，这是 **myshell** 用于识别脚本配置的唯一文件：

**config.json:**

```json
{
  "test": {
    "type": "shell",
    "desc": "this is a test for myshell remote scripts.",
    "path": "./shell/test.sh"
  }
}
```

`config.json`中的**每个key**是作为最终执行的**命令名**来进行处理，即，安装脚本后，可以使用 `ms test` 来调用执行脚本文件。

**type** 表明脚本类型，如果是shell脚本，则值为shell，若为node脚本，目前**没有依赖识别**，请使用**单文件+原生模块**进行开发，或者使用webpack将node工程打包成**单文件脚本**。

**desc** 是该命令的描述，一般用于告诉用户该命令的作用以及使用方法等。

**path** 是脚本的位置，**需使用相对路径**，基于`config.json`。

具体可参考：[git-branch-util](https://github.com/ms-ecology/git-branch-util)

## 使用方法

### 安装

```sh
npm i myshell -g 
# 安装完成后可使用全局命令“ms”进行使用
```

```sh
npm i myshell -D 
# 如果只在某些项目下面安装，则须使用“npx ms”进行使用
```

### ms

在命令行中使用 ms 来查看可用命令和配置

### ms commit

使用 ms commit 进行提交说明的创建，同时我们也提供了一个缩写命令“msc”

**example**

```sh
# 例1:
msc "feat: a new feature" "src/" -s -p
# 该命令会先stash本地更改，自动拉取远端代码进行同步，然后还原更改到工作区 (-s)
# 然后add所有src／目录下的改动
# 创建一个内容为："feat: a new feature"的提交说明
# 推送到远端（-p的作用）

# 例2:
msc -s
# 该命令会先以问询的方式引导创建一个提交说明
# stash本地更改，自动拉取远端代码进行同步，然后还原更改到工作区
# 默认add当前目录下所有的改动，以问询内容创建一个commit

# 例3
msc
# 该命令会先以问询的方式引导创建一个提交说明
# 默认add当前目录下所有的改动，以问询内容创建一个commit
# 因为没有使用-p参数，所以不会自动将代码推送至远端，需要用户自己使用git push进行推送
```

### ms template

使用该命令录入自己的常用脚本，录入完成后，可使用 `ms {你录入的脚本名称}` 进行使用

**example**

```sh
ms template
# 该命令会引导用户进行脚本录入

ms template -h
# 查看所有的帮助选项
```

### ms cat \<command\>

```sh
ms cat <your own command>
# 用于查看已录入的脚本文件的源码
```

### ms edit \<command\>

```sh
ms edit <your own command>
# 使用vim编辑器对已录入的命令源码进行编辑
```

## 注意⚠️

请确保您编辑的脚本中所接收的参数不存在**任意换行或者空格符号**。

因为会导致myshell在转换参数时发生一些**问题**。

如某些情况下必须使用空格（脚本需要接受json字符串等），我们会在进行参数传递时将`\n`转换为 `_enter_`，`\s`转换为`_nbsp_`，请确保您的脚本中有包含替换逻辑。

以node脚本为例：

```js
let json = process.argv.slice(2)[0]
json = json.replace(/_enter_/g, '\n').replace(/_nbsp_/g, ' ')
try {
  JSON.parse(json)
} catch (err) {
  console.log(err)
}
```
