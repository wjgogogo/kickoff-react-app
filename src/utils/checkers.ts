import validate from "validate-npm-package-name";
import chalk from "chalk";
import { execSync } from "child_process";

import semver from "semver";
import pkg from "../../package.json";
import { GIT_VERSION_RANGE } from "../constants";

export const checkProjectName = (projectName: string) => {
	const result = validate(projectName);
	if (!result.validForNewPackages) {
		console.error(
			`Can't create a project named ${chalk.red.bold(
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
		console.error(
			chalk.red(
				`You are using node ${chalk.cyan.bold(nodeVersion)}.\n` +
					`Kickoff-React-App requires node ${chalk.cyan.bold(range)}.\n` +
					`Please update your version of node.`
			)
		);
		process.exit(1);
	}
};

export const checkGitVersion = (): void => {
	let gitVersion: string;
	try {
		gitVersion = execSync("git --version")
			.toString()
			.match(/(\d+.\d+.\d+)/)?.[0] as string;
	} catch (error) {
		console.error(
			chalk.red(
				`Kickoff-React-App requires git ${chalk.cyan.bold(
					GIT_VERSION_RANGE
				)}, Please install git firstly.`
			)
		);
		process.exit(1);
	}

	const result = semver.satisfies(gitVersion, GIT_VERSION_RANGE);

	if (!result) {
		console.error(
			chalk.red(
				`You are using git ${chalk.cyan.bold(gitVersion)}.\n` +
					`Kickoff-React-App requires git ${chalk.cyan.bold(
						GIT_VERSION_RANGE
					)}.\n` +
					`Please upgrade your git version.`
			)
		);
		process.exit(1);
	}
};
