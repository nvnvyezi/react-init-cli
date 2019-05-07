#!/usr/bin/env node
const program = require("commander");
const { resolve } = require("path");
const fse = require("fs-extra");
const chalk = require("chalk");

let projectName = null;

program
  .version(require("../package.json").version, "-V --version")
  .command("init <name>")
  .description("生成一个新的项目")
  .alias("i")
  .action(name => {
    projectName = name;
    // require(resolve(__dirname, "../command/init"));
  });
program.parse(process.argv);
program.projectName = projectName;

if (!projectName) {
  console.error(chalk.red("未提供项目名称，eg: generate-react init my-react"));
  process.exit(1);
}

if (fse.pathExistsSync(resolve(process.cwd(), projectName))) {
  console.error(chalk.red(`项目名${projectName}已存在，请修改项目名后重试`));
  process.exit(1);
}

if (!program.args.length) {
  program.help();
}

module.exports = program;
