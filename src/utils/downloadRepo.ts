// @ts-ignore
import download from "download-git-repo";
import { TEMPLATE_URL } from "../constants";

export const downloadRepo = (projectPath: string) => {
	return new Promise((resolve, reject) => {
		download(TEMPLATE_URL, projectPath, function (error: Error) {
			if (error) {
				reject(error);
				return;
			}
			resolve(undefined);
		});
	});
};
