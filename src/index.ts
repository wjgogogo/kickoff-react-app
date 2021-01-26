import { Command, program } from "commander";
import pkg from "../package.json";
import { checkNodeVersion } from "./utils/versionChecker";
import addInitCommand from "./utils/addInitCommand";

checkNodeVersion();

program.name(pkg.name);
program.version(pkg.version, "-v, --version", "output the cli version");

addInitCommand(program as Command);

program.parse(process.argv);
