# myshell

Quickly submit code and create your own running script


## Usage

### install

```sh
npm i myshell -g # then you can use with global command "ms"
```

```sh
npm i myshell -D # in some node project file, you can use command with "npx ms"
```

### ms

type "ms" on command line for options and help.


### ms commit

Use this commands to commit your git changes, we also provide a 

simple command named "msc", the usage is same like "ms commit".

**example**

```sh
# e.g.1:
msc "feat: a new feature" "src/" -p
# the command will pull origin first
# then add all changes in src/
# create a commit with message: "feat: a new feature"
# push to origin

# e.g.2:
msc -p
# the command will ask for some questions to complete commit message
# pull origin
# create commit with comments
# push to origin

# e.g.3
msc
# the command will ask for some questions to complete commit message
# pull origin
# create commit with comments
# without option "-p", it wouldn't push to origin, you need to run "git push" by yourself
```

### ms template

Use this command to load your custom scripts. Then you can use "ms {your-command}" to run your commands.

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


## TODO

- ms merge \<to-branch\> [comments]
