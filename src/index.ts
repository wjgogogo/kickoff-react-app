import { Command, program } from "commander";
import pkg from "../package.json";
import { checkGitVersion, checkNodeVersion } from "./utils/checkers";
import { addCreateCommand, addInitCommand } from "./utils/commands";

checkNodeVersion();
checkGitVersion();

program.name(pkg.name);
program.version(pkg.version, "-v, --version", "output the cli version");
program.usage("<command> [options]");

addInitCommand(program as Command);
addCreateCommand(program as Command);

program.parse(process.argv);
