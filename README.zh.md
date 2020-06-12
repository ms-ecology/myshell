# myshell

用于快速提交代码和收录自定义运行脚本

简体中文 | [English](./README.md)

## 使用方法

### 安装

```sh
npm i myshell -g # 安装完成后可使用全局命令“ms”进行使用
```

```sh
npm i myshell -D # 如果只在某些项目下面安装，则须使用“npx ms”进行使用
```

### ms

在命令行中使用 ms 来查看可用命令和配置

### ms commit

使用 ms commit 进行提交说明的创建，同时我们也提供了一个缩写命令“msc”

**example**

```sh
# 例1:
msc "feat: a new feature" "src/" -p
# 该命令会先自动拉取远端代码进行同步
# 然后add所有src／目录下的改动
# 创建一个内容为："feat: a new feature"的提交说明
# 推送到远端（-p的作用）

# 例2:
msc -p
# 该命令会先以问询的方式引导创建一个提交说明
# 拉取远端代码进行同步
# 默认add当前目录下所有的改动，以问询内容创建一个commit
# 推送到远端

# 例3
msc
# 该命令会先以问询的方式引导创建一个提交说明
# 拉取远端代码进行同步
# 默认add当前目录下所有的改动，以问询内容创建一个commit
# 因为没有使用-p参数，所以不会自动将代码推送至远端，需要用户自己使用git push进行推送

# 同时提供一个-P参数，使用该参数时，不会自动运行git pull进行同步
```

### ms template

使用该命令录入自己的常用脚本，录入完成后，可使用 ms {你录入的脚本名称} 进行使用

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
