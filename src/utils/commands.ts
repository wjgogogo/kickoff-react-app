import { Command } from "commander";

import { checkProjectName } from "./checkers";
import { create, useCreateInquirer } from "./inquirers";

export const addCreateCommand = (program: Command): void => {
	program
		.command("create <project-name>")
		.description(`create project interactively`)
		.action((projectName: string) => {
			checkProjectName(projectName);
			console.log("success:", projectName);
			useCreateInquirer(projectName);
		});
};

export const addInitCommand = (program: Command): void => {
	program
		.command("init <project-name>")
		.description(`quick generator a project from template`)
		.action((projectName: string) => {
			checkProjectName(projectName);
			console.log("success:", projectName);
			create(projectName);
		});
};
