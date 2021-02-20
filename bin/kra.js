#!/usr/bin/env node

const pkg = require("../package.json");
const run=require("../lib/index.js").default;
run(pkg.name, pkg.version);

