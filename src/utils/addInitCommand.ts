import { Command } from "commander";
import chalk from "chalk";
import checkProjectName from "./projectNameChecker";

enum TemplateType {
	DEFAULT = "default",
	DEFAULT_TS = "default-ts",
}

const TEMPLATES = [
	{ type: TemplateType.DEFAULT as string, features: ["react17", "babel"] },
	{
		type: TemplateType.DEFAULT_TS as string,
		features: ["react17", "babel", "typescript"],
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
		.description(`quick generator a project from template.`)
		.option(
			"-t, --template <template-type>",
			`the option can be one of:\n` +
				`    - ${chalk.blue(TEMPLATES[0].type)} [${chalk.yellow(
					TEMPLATES[0].features
				)}]\n` +
				`    - ${chalk.blue(TEMPLATES[1].type)} [${chalk.yellow(
					TEMPLATES[1].features
				)}]`,
			TemplateType.DEFAULT
		)
		.action((projectName: string, options: { template: TemplateType }) => {
			checkProjectName(projectName);
			checkTemplateType(options.template);
			console.log("success:", projectName, options.template);
		});
};
