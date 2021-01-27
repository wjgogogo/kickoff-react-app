import inquirer, { QuestionCollection } from "inquirer";
import { TEMPLATES } from "./commands/initCommand";

const PRESET_PROMPT: QuestionCollection<{ preset: "ts" | "js" | "manual" }> = [
	{
		name: "preset",
		type: "list",
		message: "Please pick a preset:",
		choices: [
			...TEMPLATES.map(t => ({ name: t.description, value: t.type })),
			{
				name: "Manually select features",
				value: "manual",
			},
		],
	},
];

const FEATURES_PROMPT: QuestionCollection<{
	language: string;
	css: string;
	jest: boolean;
	lint: boolean;
	hook: boolean;
}> = [
	{
		name: "language",
		type: "list",
		message: "Choose a language for your project:",
		choices: [
			{
				name: "Javascript",
				value: "js",
			},
			{
				name: "Typescript",
				value: "ts",
			},
		],
	},
	{
		name: "css",
		type: "list",
		message:
			"Choose a CSS pre-processor(PostCSS, Autoprefixer are supported by default):",
		choices: [
			{
				name: "@Emotion(CSS in JS)",
				value: "emotionjs",
			},
			{
				name: "Less",
				value: "less",
			},
			{
				name: "None",
				value: "none",
			},
		],
	},
	{
		name: "jest",
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
];

export const create = async () => {
	const answer1 = await inquirer.prompt(PRESET_PROMPT);
	if (answer1.preset === "manual") {
		const answer2 = await inquirer.prompt(FEATURES_PROMPT);
		console.log(answer2);
	}

	console.log(answer1);
};
