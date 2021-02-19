import inquirer from "inquirer";
import { downloadRepo } from "./downloadRepo";
import { customizeTemplate } from "./customizeTemplate";

export interface Options {
	css: "emotionjs" | "less" | "none";
	unitTest: boolean;
	lint: boolean;
	hook: boolean;
}

export const create = async (
	projectName: string,
	options: Options = { css: "none", unitTest: false, lint: false, hook: false }
) => {
	try {
		const projectPath = `${process.cwd()}/${projectName}`;
		await downloadRepo(projectPath);
		await customizeTemplate(projectPath, options);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
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
			message: "Do you wanna add lint and prettier in your project",
			default: true,
		},
		{
			name: "hook",
			type: "confirm",
			message:
				"Do you wanna add pre-commit git hook to format your code in your project",
			when: answer => answer.lint,
			default: true,
		},
	]);
	create(projectName, options);
};
