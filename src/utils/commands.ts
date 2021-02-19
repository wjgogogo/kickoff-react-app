import { Command } from "commander";
import {
	create,
	useCreateInquirer,
	useProjectNameValidationInquirer,
} from "./inquirers";

export const addCreateCommand = (program: Command): void => {
	program
		.command("create <project-name>")
		.description(`create project interactively`)
		.action(async (projectName: string) => {
			const name = await useProjectNameValidationInquirer(projectName);
			await useCreateInquirer(name);
		});
};

export const addInitCommand = (program: Command): void => {
	program
		.command("init <project-name>")
		.description(
			`quick generator a project without any css pre-processor, test and lint library support`
		)
		.action(async (projectName: string) => {
			const name = await useProjectNameValidationInquirer(projectName);
			await create(name);
		});
};
