import { execSync } from "child_process";
import chalk from "chalk";
import { FIRST_COMMIT_MESSAGE } from "../constants";

export const commitProject = (projectPath: string) => {
	try {
		execSync(
			`cd ${projectPath} && git init && git add --all && git commit -m "${FIRST_COMMIT_MESSAGE}"`
		);
	} catch (error) {
		console.log(
			chalk.yellow(`failed to initialize git repo, you can try later.`)
		);
	}
};

export const installDependencies = (projectPath: string) => {
	try {
		execSync(`cd ${projectPath} && npm install`);
	} catch (error) {
		console.log(
			chalk.yellow(`failed to install dependencies, you can try later.`)
		);
	}
};
