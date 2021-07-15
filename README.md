# myshell

Quickly submit code and create your own running script

[简体中文](./README.zh.md) | English

## Big Update✨✨

### Remote Scripts' Usage 🚀

Now supported use `ms add [module]` to add remote scripts into locale enviroment, for example：

```sh
ms add git-branch-util # add ms-ecology/git-branch-util into locale enviroment
# and then, you can use [ms cfb <branch-name>] to create a git branch
```

If you need to remove a remote scripts that is not in use, you can also use `ms remove [module]` to uninstall it, for example:

```sh
ms remove git-branch-util # Remove all scripts provided by the module
```

Of course, the original `ms template` capability can also be used to delete some scripts that are not used

```sh
ms template -D cfb # This command will only delete the [cfb] command, and other commands provided by the module will still be retained
# But please pay attention to the dependency problem. For example, in git-branch-util, [cfb] is based on [feature]. When [feature] is deleted, the corresponding execution of [cfb] will also fail
```

### Install Remote Scripts 📚

In organization `ms-ecology`，The created warehouse can be downloaded directly by **myshell**, such as [git-branch-util](https://github.com/ms-ecology/git-branch-util) , if you want to add the code in the warehouse, just:

```sh
ms add git-branch-util # This command will automatically search and download in [ms-ecology]
```

You can also download the external warehouse script:

```sh
# ms add <github-username/repo-name>
ms add ms-ecology/number-game # You can fill in the full path to download. At present, it only supports GitHub. Gitlab and so on, which will be considered later
```

### Develop Remote Scripts 🔧

The remote script of **myshell** is based on GitHub. You only need to create a new warehouse to be used as the source of remote download of **myshell**.

However, please note that the root directory of the warehouse must have a `config.json` file, which is the only file used by **myshell** to identify script configuration

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

Every key in `config.json` are all final use as command name, it means that you can run `ms test` to execute your scripts.

**type** is for scripts type, if it's a shell script, the value maybe "shell", if it's nodejs script, the value is "node", caution that there is no dependencies for scripts, please use **single file + original module** in devolopment, or use *webpack* pack your nodejs tobe a single file.

**desc** is for command describetion, it's telling user how to use it and how it works

**path** is for command's path，**relative path is needed**，base on `config.json`。

for more infomation：[git-branch-util](https://github.com/ms-ecology/git-branch-util)

## Usage

### install

```sh
npm i myshell -g
# then you can use with global command "ms"
```

```sh
npm i myshell -D 
# in some node project file, you can use command with "npx ms"
```

### ms

type "ms" on command line for options and help.

### ms commit

Use this commands to commit your git changes, we also provide a

simple command named "msc", the usage is same like "ms commit".

**example**

```sh
# e.g.1:
msc "feat: a new feature" "src/" -s -p
# the command will stash changes and pull origin, then fallback changes (-s)
# then add all changes in src/
# create a commit with message: "feat: a new feature"
# push to origin (-p)

# e.g.2:
msc -s
# the command will ask for some questions to complete commit message
# then stash changes and pull origin, then fallback changes
# create commit with comments

# e.g.3
msc
# the command will ask for some questions to complete commit message
# create commit with comments
# without option "-p", it wouldn't push to origin, you need to run "git push" by yourself
```

### ms template

Use this command to load your custom scripts. Then you can use `ms {your-command}` to run your commands.

**example**

```sh
ms template
# command will guide you to create your own scripts

ms template -h
# for more infomation
```

### ms cat \<command\>

```sh
ms cat <your own command>
# this command can display you command's source code
```

### ms edit \<command\>

```sh
ms edit <your own command>
# open a vim editor to edit your command source code
```

## Warning⚠️

Please make sure that the parameters you receive in the script you edit do not contain **any line breaks or space marks**.

It will cause some problems in myshell when conversion parameters。

For example, in some cases, spaces must be used (the script needs to accept JSON strings, etc.), we will convert `\n` to `_enter_`, `\s` to `_nbsp_`, Make sure your script contains replacement logic.

A node example:

```js
let json = process.argv.slice(2)[0]
json = json.replace(/_enter_/g, '\n').replace(/_nbsp_/g, ' ')
try {
  JSON.parse(json)
} catch (err) {
  console.log(err)
}
```
