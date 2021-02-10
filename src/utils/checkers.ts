import validate from "validate-npm-package-name";
import chalk from "chalk";
import semver from "semver";
import pkg from "../../package.json";

export const checkProjectName = (projectName: string) => {
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

export const checkNodeVersion = (): void => {
	const nodeVersion = process.version;
	const range = pkg.engines.node;
	const result = semver.satisfies(nodeVersion, range);

	if (!result) {
		console.log(
			chalk.red(
				`you are using node ${nodeVersion}.\n` +
					`kickoff-react-app requires node ${range}.\n` +
					`please update your version of node.`
			)
		);
		process.exit(1);
	}
};
