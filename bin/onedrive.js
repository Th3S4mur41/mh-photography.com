import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, sep } from 'node:path';
import url from 'node:url';
import minimist from 'minimist';
import fetch from 'node-fetch';

/**
 * Fetches the contents of a shared OneDrive folder.
 * @param {string} sharedLink - The link to the shared OneDrive folder.
 * @returns {Promise<Object>} The contents of the folder.
 * @throws Will throw an error if the folder contents cannot be fetched.
 */
async function getFolderContents(sharedLink) {
	const response = await fetch(`https://api.onedrive.com/v1.0/shares/u!${btoa(sharedLink)}/root/children`);
	if (!response.ok) {
		throw new Error('Failed to fetch folder contents');
	}
	return response.json();
}

/**
 * Downloads a file from OneDrive.
 * @param {string} fileUrl - The URL of the file to download.
 * @param {string} fileName - The name of the file to save.
 * @param {string} outputFolder - The folder to save the file in.
 * @returns {Promise<string>} The path to the downloaded file.
 * @throws Will throw an error if the file cannot be downloaded.
 */
async function downloadFile(fileUrl, fileName, outputFolder) {
	const filePath = join(outputFolder, fileName);
	const response = await fetch(fileUrl);

	if (!response.ok) {
		throw new Error(`Failed to download file: ${filePath}`);
	}

	const blob = await response.blob();
	const arrayBuffer = await blob.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	// Ensure directory exists
	await mkdir(dirname(filePath), { recursive: true });

	// Write buffer to file in output folder
	await writeFile(filePath, buffer);

	return filePath;
}

/**
 * Recursively downloads all files in a shared OneDrive folder.
 * @param {string} sharedFolderLink - The link to the shared OneDrive folder.
 * @param {string} [outputFolder='./'] - The folder to save the downloaded files in.
 * @returns {Promise<void>} - Resolves when all files are downloaded.
 * @throws Will throw an error if the files cannot be downloaded.
 */
async function downloadSharedFolderContents(sharedFolderLink, outputFolder = './') {
	const ouputPath = outputFolder.endsWith(sep) ? outputFolder : outputFolder + sep;

	try {
		const folderContents = await getFolderContents(sharedFolderLink);
		// console.log('Folder contents:', folderContents);

		for (const item of folderContents.value) {
			if (item.file) {
				await downloadFile(item['@content.downloadUrl'], item.name, ouputPath);
			} else if (item.folder) {
				const subfolderPath = join(ouputPath, item.name);
				await downloadSharedFolderContents(item.webUrl, subfolderPath);
			}
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

/**
 * Main function to start the download process.
 * Parses command-line arguments and initiates the download.
 * @returns {Promise<void>} - Resolves when the download is complete.
 */
async function main() {
	const args = minimist(process.argv.slice(2), {
		alias: {
			link: 'l',
			output: 'o',
		},
	});

	const { link, output = './' } = args;

	if (!link) {
		console.log('Usage: node onedrive.js --link <sharedFolderLink> [--output <outputFolder>]');
		console.log('Example: node onedrive.js --link "https://1drv.ms/f/xxx" --output "./downloads"');
		process.exit(1);
	}

	try {
		console.log(`Downloading shared folder from: ${link} to ${output}`);
		await downloadSharedFolderContents(link, output);
		console.log('Download completed successfully');
	} catch (error) {
		console.error('Error:', error.message);
		process.exit(1);
	}
}

// Run if called directly (not imported)
if (import.meta.url === url.pathToFileURL(process.argv[1]).href) {
	main();
}

export { downloadSharedFolderContents };
