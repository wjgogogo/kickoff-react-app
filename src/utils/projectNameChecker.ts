import validate from "validate-npm-package-name";
import chalk from "chalk";

export default (projectName: string) => {
	const result = validate(projectName);
	if (!result.validForNewPackages) {
		console.error(
			`can't create a project named ${chalk.green(
				projectName
			)}, because of npm naming restrictions:`
		);
		[...(result.errors ?? []), ...(result.warnings ?? [])].forEach(error => {
			console.error(`    - ${chalk.red(error)}`);
		});
		process.exit(1);
	}
};
