const path=require("path");

const PUBLIC_HTML_PATH=path.resolve(__dirname,"../public/index.html");

const ENTRY_PATH=path.resolve(__dirname,"../src/index.tsx");
const OUTPUT_PATH=path.resolve(__dirname,"../dist");

const IN_DEV=process.env.NODE_ENV==="dev";
const IN_PROD=process.env.NODE_ENV==="prod";
const IN_TEST=process.env.NODE_ENV==="test";
const ENABLE_ANALYZER=process.env.ENABLE_ANALYZER==="true"

module.exports={
	PUBLIC_HTML_PATH,
	ENTRY_PATH,
	OUTPUT_PATH,
	IN_DEV,
	IN_PROD,
	IN_TEST,
	ENABLE_ANALYZER
}