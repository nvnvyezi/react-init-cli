const inquirer = require("inquirer");

const cmd = require("./cmd");
const cssList = require(`${__dirname}/../css-preprocessor`);
const cssLists = Object.keys(cssList) || [];

const projectName = cmd.projectName;

module.exports = {
  getQuestions: () => {
    const questions = [
      {
        name: "projectName",
        type: "input",
        message: "项目名字：",
        default: projectName,
        filter(val) {
          return val.trim();
        },
        validate(val) {
          const validate = val.trim().split(" ").length === 1;
          return validate || "Project name is not allowed to have spaces ";
        },
        transformer(val) {
          return val;
        }
      },
      {
        name: "description",
        type: "input",
        message: "项目描述：",
        default: "my-react"
      },
      {
        name: "author",
        type: "input",
        message: "作者"
      },
      {
        type: "list",
        name: "cssPreprocessor",
        message: "选择css预处理器",
        choices: cssLists,
        default: cssLists[0]
      }
    ];
    return inquirer.prompt(questions);
  }
};
