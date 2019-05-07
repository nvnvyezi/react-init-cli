#!/usr/bin/env node
const chalk = require("chalk");
const download = require("download-git-repo");
const ora = require("ora");
const fs = require("fs");

const inquirer = require("../lib/inquirer");

const tplList = require(`${__dirname}/../css-preprocessor.json`);

function initTemplate(config) {
  const { projectName, description, author, cssPreprocessor } = config;
  const gitPlace = tplList[cssPreprocessor]["place"];
  const gitBranch = tplList[cssPreprocessor]["branch"];
  const spinner = ora("正在生成...");
  spinner.start();
  download(`${gitPlace}${gitBranch}`, `./${projectName}`, err => {
    if (err) {
      console.log(chalk.red(err));
      process.exit();
    }
    fs.readFile(`./${projectName}/package.json`, "utf8", function(err, data) {
      if (err) {
        spinner.stop();
        console.error(err);
        return;
      }
      const packageJson = JSON.parse(data);
      packageJson.name = projectName;
      packageJson.description = description;
      packageJson.author = author;
      var updatePackageJson = JSON.stringify(packageJson, null, 2);
      fs.writeFile(
        `./${projectName}/package.json`,
        updatePackageJson,
        "utf8",
        function(err) {
          if (err) {
            spinner.stop();
            console.error(err);
            return;
          } else {
            spinner.stop();
            console.log(chalk.green("project init successfully!"));
            console.log(`
            ${chalk.bgWhite.black("  运行项目  ")}
            ${chalk.yellow(`cd ${projectName}`)}
            ${chalk.yellow("yarn install")}
            ${chalk.yellow("npm run start")}
          `);
          }
        }
      );
    });
  });
}

const launch = async () => {
  const config = await inquirer.getQuestions();
  initTemplate(config);
};

launch();
