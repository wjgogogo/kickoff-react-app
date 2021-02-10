import inquirer, { QuestionCollection } from "inquirer";

const FEATURES_PROMPT: QuestionCollection<{
	css: string;
	jest: boolean;
	lint: boolean;
	hook: boolean;
}> = [
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
	const answer2 = await inquirer.prompt(FEATURES_PROMPT);
	console.log(answer2);
};
