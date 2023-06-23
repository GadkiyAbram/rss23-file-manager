import {
    ADD,
    CAT,
    CP, FILE_ALREADY_EXISTS, FILE_NOT_EXISTS,
    INVALID_INPUT,
    MV,
    OPERATION_FAILED,
    RM,
    RN
} from '../constants/commands.js';
import fs from 'fs';
import utils from '../operations/utils/index.mjs';
import path from 'path';
import CurrentPath from '../userHandling/CurrentPath.js';

const {
    getPath,
    checkIfDirExists
} = utils;

const createFile = async (currentDir, fileName) => {
    // const filePath = getPath(currentDir, fileName);
    const filePath = getPath(CurrentPath.getCurrentPath(), fileName);

    if (await checkIfDirExists(filePath)) {
        console.log(OPERATION_FAILED);

        return;
    }

    return fs.writeFileSync(filePath, '');
};

const removeFile = async (currentDir, fileName) => {
    const filePath = getPath(currentDir, fileName);

    const fileExists = await checkIfDirExists(filePath);

    if (!fileExists) {
        console.log(INVALID_INPUT);

        return;
    }

    return fs.unlinkSync(filePath);
}

const renameFile = async (currentDir, pathToPrevFile, fileNewName) => {
    const pathToFolder = getPath(currentDir, pathToPrevFile);

    const filePrevName = pathToFolder.split('/').pop();
    const pathToFile = path.dirname(pathToFolder);

    const filePathToRename = getPath(pathToFile, filePrevName);
    const filePathRenamed = getPath(pathToFile, fileNewName);

    const [
        fileToRenameExists,
        fileFinalExists
    ] = await Promise.all([
        checkIfDirExists(filePathToRename),
        checkIfDirExists(filePathRenamed)
    ]);

    if (!fileToRenameExists) {
        console.log(FILE_NOT_EXISTS);

        return;
    }

    if (fileFinalExists) {
        console.log(FILE_ALREADY_EXISTS);

        return;
    }

    return fs.renameSync(filePathToRename, filePathRenamed);
}

const copyOrDeleteFile = async (currentDir, srcFileDir, distDir, deleteSrcFile = false) => {
    const pathToSrcFolder = getPath(currentDir, srcFileDir);
    const fileName = pathToSrcFolder.split('/').pop();
    const pathToDistFolder = getPath(currentDir, distDir, fileName);

    if (!await checkIfDirExists(pathToSrcFolder)) {
        console.log(FILE_NOT_EXISTS);

        return;
    }

    if (await checkIfDirExists(pathToDistFolder)) {
        console.log(FILE_ALREADY_EXISTS);

        return;
    }

    const [
        input,
        output
    ] = await Promise.all([
        fs.createReadStream(pathToSrcFolder),
        fs.createWriteStream(pathToDistFolder)
    ]);

    input.pipe(output);

    if (deleteSrcFile) {
        await Promise.resolve(checkIfDirExists(pathToDistFolder)).then(() =>
            fs.unlinkSync(pathToSrcFolder));
    }
}

export const readFile = async (currentDir, fileDir) => {
    // const filePath = getPath(currentDir, fileDir);
    const filePath = getPath(CurrentPath.getCurrentPath(), fileDir);

    if (!await checkIfDirExists(filePath)) {
        console.log(OPERATION_FAILED);

        return;
    }

    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(filePath);
        let result = '';

        readStream.on('error', (err) => reject(err));
        readStream.on('data', (chunk) => result += chunk);
        readStream.on('end', () => resolve(result));
    });
}

export const filesController = async (cmd, payload, currentDir) => {
    if (!payload) {
        return INVALID_INPUT
    }

    switch (cmd) {
        case CAT:
            return readFile(currentDir, payload[0]);
        case ADD:
            return createFile(currentDir, payload[0]);
        case RN:
            return renameFile(currentDir, payload[0], payload[1]);
        case CP:
            return copyOrDeleteFile(currentDir, payload[0], payload[1]);
        case MV:
            return copyOrDeleteFile(currentDir, payload[0], payload[1], true);
        case RM:
            return removeFile(currentDir, payload[0], payload[1]);
        default:
            return OPERATION_FAILED;
    }
};