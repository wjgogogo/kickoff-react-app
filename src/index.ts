import { Command, program } from "commander";
import { checkGitVersion, checkNodeVersion } from "./utils/checkers";
import { addCreateCommand, addInitCommand } from "./utils/commands";
import { CLI_NAME, CLI_VERSION } from "./constants";

checkNodeVersion();
checkGitVersion();

program.name(CLI_NAME);
program.version(CLI_VERSION, "-v, --version", "output the cli version");
program.usage("<command> [options]");

addInitCommand(program as Command);
addCreateCommand(program as Command);

program.parse(process.argv);
