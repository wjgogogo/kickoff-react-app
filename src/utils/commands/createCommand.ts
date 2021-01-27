import { Command } from "commander";

import checkProjectName from "../projectNameChecker";
import { create } from "../createInquirer";

export default (program: Command): void => {
	program
		.command("create <project-name>")
		.description(`create project interactively`)
		.action((projectName: string) => {
			checkProjectName(projectName);
			console.log("success:", projectName);
			create();
		});
};
