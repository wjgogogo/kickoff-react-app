import { Command, program } from "commander";
import { checkGitVersion, checkNodeVersion } from "./utils/checkers";
import { addCreateCommand, addInitCommand } from "./utils/commands";

export default (cliName: string, cliVersion: string) => {
	checkNodeVersion();
	checkGitVersion();

	program.name(cliName);
	program.version(cliVersion, "-v, --version", "output the cli version");
	program.usage("<command> [options]");

	addInitCommand(program as Command);
	addCreateCommand(program as Command);

	program.parse(process.argv);
};
