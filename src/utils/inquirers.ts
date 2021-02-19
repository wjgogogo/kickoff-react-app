import inquirer from "inquirer";
import { downloadRepo } from "./downloadRepo";
import { customizeTemplate } from "./customizeTemplate";
import { commitProject, installDependencies } from "./exec";
import { checkProjectName } from "./checkers";
import * as fs from "fs";
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
			message: `Do you wanna override existed project (${projectName} is exist) ?`,
			default: false,
		},
		{
			name: "name",
			type: "text",
			message:
				"Please input new project name (make sure name is valid and doesn't exist, otherwise we won't pass this question) :",
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
			message:
				"Choose a CSS pre-processor(PostCSS, Autoprefixer are supported by default):",
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
			message:
				"Do you wanna add jest and @testing-library/react in your project?",
			default: true,
		},
		{
			name: "lint",
			type: "confirm",
			message: "Do you wanna add lint and prettier in your project?",
			default: true,
		},
		{
			name: "hook",
			type: "confirm",
			message:
				"Do you wanna add pre-commit git hook to format your code in your project?",
			when: answer => answer.lint,
			default: true,
		},
	]);
	await create(projectName, options);
};

export const create = async (
	projectName: string,
	options: Options = { css: "none", unitTest: false, lint: false, hook: false }
) => {
	const projectPath = getProjectPath(projectName);
	try {
		await downloadRepo(projectPath);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
	customizeTemplate(projectPath, projectName, options);
	commitProject(projectPath);
};

export const useInstallInquirer = async (projectName: string) => {
	const options = await inquirer.prompt([
		{
			name: "install",
			type: "confirm",
			message: "Do you wanna install the dependencies?",
			default: true,
		},
	]);
	if (options.install) {
		installDependencies(getProjectPath(projectName));
	}
};
