import { Command, program } from "commander";
import pkg from "../package.json";
import { checkNodeVersion } from "./utils/versionChecker";
import addInitCommand from "./utils/commands/initCommand";
import addCreateCommand from "./utils/commands/createCommand";

checkNodeVersion();

program.name(pkg.name);
program.version(pkg.version, "-v, --version", "output the cli version");
program.usage("<command> [options]");

addInitCommand(program as Command);
addCreateCommand(program as Command);

program.parse(process.argv);
