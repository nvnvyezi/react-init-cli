#!/usr/bin/env node
process.env.NODE_PATH = __dirname + "/../node_modules/";
const program = require("commander");
const { resolve } = require("path");

const res = command => resolve(__dirname, "../command/", command);

program.version(require("../package").version, "-V --version");

// program.usage("<command>");

program
  .command("init <name>")
  .description("生成一个新的项目")
  .alias("i")
  .action(() => {
    require(res("init"));
  });

program.parse(process.argv);
if (!program.args.length) {
  program.help();
}
