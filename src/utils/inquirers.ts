import inquirer from "inquirer";
import { downloadRepo } from "./downloadRepo";
import { customizeTemplate } from "./customizeTemplate";
import { commitProject, installDependencies } from "./exec";
import { checkProjectName } from "./checkers";
import * as fs from "fs";
import ora from "ora";
import chalk from "chalk";
import validate from "validate-npm-package-name";

export interface Options {
	css: "emotionjs" | "less" | "none";
	unitTest: boolean;
	lint: boolean;
	hook: boolean;
}

export const getProjectPath = (projectName: string) => {
	return `${process.cwd()}/${projectName}`;
};

export const useProjectNameValidationInquirer = async (projectName: string) => {
	checkProjectName(projectName);

	if (!fs.existsSync(getProjectPath(projectName))) {
		return projectName;
	}
	const options = await inquirer.prompt([
		{
			name: "override",
			type: "confirm",
			message: `Do you want to override existed ${projectName} project?`,
			default: false,
		},
		{
			name: "name",
			type: "text",
			message:
				"Please input new name (make sure name is valid and doesn't exist, otherwise it won't pass the question) :",
			default: projectName,
			when: answer => !answer.override,
			validate(name: string) {
				const result = validate(name);
				return (
					result.validForNewPackages && !fs.existsSync(getProjectPath(name))
				);
			},
		},
	]);
	return options.name;
};

export const useCreateInquirer = async (projectName: string) => {
	const options = await inquirer.prompt([
		{
			name: "css",
			type: "list",
			message: `Choose a CSS pre-processor (${chalk.cyan(
				"PostCSS"
			)}, ${chalk.cyan("Autoprefixer")} are supported by default) :`,
			choices: [
				{
					name: "Less",
					value: "less",
				},
				{
					name: "@Emotion(CSS in JS)",
					value: "emotionjs",
				},
				{
					name: "None",
					value: "none",
				},
			],
		},
		{
			name: "unitTest",
			type: "confirm",
			message: `Do you want to add ${chalk.cyan("jest")} and ${chalk.cyan(
				"@testing-library/react"
			)}?`,
			default: true,
		},
		{
			name: "lint",
			type: "confirm",
			message: `Do you want to add ${chalk.cyan("lint")} and ${chalk.cyan(
				"prettier"
			)}?`,
			default: true,
		},
		{
			name: "hook",
			type: "confirm",
			message: `Do you want to add ${chalk.cyan(
				"pre-commit"
			)} git hook to format your code?`,
			when: answer => answer.lint,
			default: true,
		},
	]);
	await create(projectName, options);
};

export const useInstallInquirer = async (projectName: string) => {
	const options = await inquirer.prompt([
		{
			name: "install",
			type: "confirm",
			message: "Do you want to install the dependencies?",
			default: true,
		},
	]);
	if (options.install) {
		installDependencies(getProjectPath(projectName));
	}
};

export const create = async (
	projectName: string,
	options: Options = { css: "none", unitTest: false, lint: false, hook: false }
) => {
	const projectPath = getProjectPath(projectName);
	const spinner = ora("Downloading Template...");
	try {
		spinner.start();
		await downloadRepo(projectPath);
		spinner.succeed("Download Successful");
	} catch (error) {
		spinner.fail("Download Failed");
		console.error(error);
		process.exit(1);
	}
	customizeTemplate(projectPath, projectName, options);
	commitProject(projectPath);
	await useInstallInquirer(projectName);
	console.log(
		"\n" + chalk.green.bold("Success Create Project ,Happy hacking!") + "\n"
	);
};
