import { Command } from "commander";
import {
	create,
	useCreateInquirer,
	useInstallInquirer,
	useProjectNameValidationInquirer,
} from "./inquirers";

export const addCreateCommand = (program: Command): void => {
	program
		.command("create <project-name>")
		.description(`create project interactively`)
		.action(async (projectName: string) => {
			const name = await useProjectNameValidationInquirer(projectName);
			await useCreateInquirer(name);
			await useInstallInquirer(name);
		});
};

export const addInitCommand = (program: Command): void => {
	program
		.command("init <project-name>")
		.description(`quick generator a project from template`)
		.action(async (projectName: string) => {
			const name = await useProjectNameValidationInquirer(projectName);
			await create(name);
			await useInstallInquirer(name);
		});
};
