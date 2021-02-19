import * as fs from "fs";

import { Options } from "./inquirers";

export const customizeTemplate = (
	projectPath: string,
	projectName: string,
	options: Options
) => {
	customizePackageConfig(projectPath, projectName, options);
	customizeTsConfig(projectPath, options);
	customizeBabelConfig(projectPath, options);
	customizeWebpackConfig(projectPath, options);
	customizeTestConfig(projectPath, options);
	customizeEslintConfig(projectPath, options);
	customizeDocument(projectPath, projectName);
};

const customizePackageConfig = (
	projectPath: string,
	projectName: string,
	options: Options
) => {
	modifyFile(`${projectPath}/package.json`, content => {
		content = content.map(i => i.replace(/PROJECT_NAME/, projectName));

		if (!options.hook) {
			// hook config start from line 16 and end at line 30
			content = content
				.filter((_, line) => line < 15 || line > 29)
				.filter(i => !/(husky|lint-staged)/.test(i));
		}

		if (!options.lint) {
			content = content.filter(i => !/(eslint|prettier)/.test(i));
		}

		if (!options.unitTest) {
			content = content.filter(i => !/(jest|test)/.test(i));
		}

		if (options.css !== "emotionjs") {
			content = content.filter(i => !/(@emotion)/.test(i));
		}

		if (options.css !== "less") {
			content = content.filter(i => !/(less)/.test(i));
		}
		return content;
	});
};

const customizeTsConfig = (projectPath: string, options: Options) => {
	modifyFile(`${projectPath}/tsconfig.json`, content => {
		if (options.css !== "emotionjs") {
			content = content
				.map(i => i.replace("react-jsx", "react"))
				.filter(i => !/jsxImportSource/.test(i));
		}

		if (!options.unitTest) {
			content = content.filter(i => !/(tests)/.test(i));
		}
		return content;
	});
};

const customizeBabelConfig = (projectPath: string, options: Options) => {
	modifyFile(`${projectPath}/babel.config.js`, content => {
		if (!options.unitTest) {
			// test preset config start from line 4 and end at line 11
			content = content
				.filter((_, idx) => idx < 3 || idx > 10)
				.map(i => i.replace(/IN_TEST,\s/, ""));
		}

		if (options.css !== "emotionjs") {
			content = content.filter(i => !/@emotion/.test(i));
		}
		return content;
	});
};

const customizeTestConfig = (projectPath: string, options: Options) => {
	if (options.unitTest) {
		return;
	}
	fs.unlinkSync(`${projectPath}/jest.config.js`);
	fs.rmdirSync(`${projectPath}/tests`, { recursive: true });
};

const customizeWebpackConfig = (projectPath: string, options: Options) => {
	const webpackFolderPath = `${projectPath}/scripts`;

	modifyFile(`${webpackFolderPath}/constants.js`, content => {
		if (!options.unitTest) {
			content = content.filter(i => !/IN_TEST/.test(i));
		}

		return content;
	});

	modifyFile(`${webpackFolderPath}/webpack.common.js`, content => {
		if (options.css !== "less") {
			// less loader config start from line 57 and end at line 88
			content = content.filter((_, idx) => idx < 56 || idx > 87);
		}

		return content;
	});
};

const customizeEslintConfig = (projectPath: string, options: Options) => {
	const eslintConfigPath = `${projectPath}/.eslintrc.js`;

	if (!options.lint) {
		fs.unlinkSync(eslintConfigPath);
		return;
	}

	modifyFile(eslintConfigPath, content => {
		if (!options.unitTest) {
			content = content.filter(i => !/jest/.test(i));
		}

		return content;
	});
};

const customizeDocument = (projectPath: string, projectName: string) => {
	modifyFile(`${projectPath}/README.md`, content => {
		content = content.map(i => i.replace(/PROJECT_NAME/, projectName));
		return content;
	});
};

const modifyFile = (
	filePath: string,
	action: (content: string[]) => string[]
) => {
	let content = fs.readFileSync(filePath, "utf8").split("\n");
	content = action(content);
	fs.writeFileSync(filePath, content.join("\n"));
};
