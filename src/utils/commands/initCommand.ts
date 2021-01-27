import { Command } from "commander";
import chalk from "chalk";
import checkProjectName from "../projectNameChecker";

enum TemplateType {
	DEFAULT_JS = "js",
	DEFAULT_TS = "ts",
}

export const TEMPLATES = [
	{
		type: TemplateType.DEFAULT_JS as string,
		description:
			"Js version with react17, babel(without test, lint and prettier)",
	},
	{
		type: TemplateType.DEFAULT_TS as string,
		description:
			"Ts version with react17, typescript and babel(without test, lint and prettier)",
	},
] as const;

const checkTemplateType = (template: string) => {
	const target = TEMPLATES.find(item => item.type === template);
	if (!target) {
		console.error(chalk.red(`can't use template named ${template}`));
		console.error(
			chalk.red("you should enter either 'default' or 'default-ts'")
		);
		process.exit(1);
	}
};

export default (program: Command): void => {
	program
		.command("init <project-name>")
		.description(`quick generator a project from template`)
		.option(
			"-t, --template <template-type>",
			`the option can be one of:\n` +
				`    - ${chalk.blue(TEMPLATES[0].type)} [${chalk.yellow(
					TEMPLATES[0].description
				)}]\n` +
				`    - ${chalk.blue(TEMPLATES[1].type)} [${chalk.yellow(
					TEMPLATES[1].description
				)}]`,
			TemplateType.DEFAULT_JS
		)
		.action((projectName: string, options: { template: TemplateType }) => {
			checkProjectName(projectName);
			checkTemplateType(options.template);
			console.log("success:", projectName, options.template);
		});
};
