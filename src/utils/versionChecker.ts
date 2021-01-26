import semver from "semver";
import chalk from "chalk";
import pkg from "../../package.json";

export const checkNodeVersion = () => {
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

export const checkGitVersion = (): boolean => true;
