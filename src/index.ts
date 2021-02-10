import { Command, program } from "commander";
import pkg from "../package.json";
import { checkNodeVersion } from "./utils/checkers";
import { addCreateCommand, addInitCommand } from "./utils/commands";

checkNodeVersion();

program.name(pkg.name);
program.version(pkg.version, "-v, --version", "output the cli version");
program.usage("<command> [options]");

addInitCommand(program as Command);
addCreateCommand(program as Command);

program.parse(process.argv);
