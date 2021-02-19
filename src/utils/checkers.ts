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

export const checkGitVersion = (): void => {
	let gitVersion: string;
	try {
		gitVersion = execSync("git --version")
			.toString()
			.match(/(\d+.\d+.\d+)/)?.[0] as string;
	} catch (error) {
		console.log(
			chalk.red(
				`kickoff-react-app requires git ${GIT_VERSION_RANGE}.\n` +
					`please install git firstly.`
			)
		);
		process.exit(1);
	}

	const result = semver.satisfies(gitVersion, GIT_VERSION_RANGE);

	if (!result) {
		console.log(
			chalk.red(
				`kickoff-react-app requires git ${GIT_VERSION_RANGE}.\n` +
					`please upgrade your git version.`
			)
		);
		process.exit(1);
	}
};
