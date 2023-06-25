import {
    ADD,
    CAT,
    CP, FILE_ALREADY_EXISTS, FILE_NOT_EXISTS,
    INVALID_INPUT,
    MV,
    OPERATION_FAILED,
    RM,
    RN
} from '../constants/consts.js';
import fs from 'fs';
import utils from '../utils/index.mjs';
import path from 'path';

const {
    getPath,
    checkIfPathExists,
    getFirstArrayElem,
    displayResult
} = utils;

const createFile = async (payload, currentDir) => {
    const fileName = getFirstArrayElem(payload);
    const filePath = getPath(currentDir, fileName);

    if (await checkIfPathExists(filePath)) {
        console.log(OPERATION_FAILED);

        return;
    }

    return fs.writeFileSync(filePath, '');
};

const removeFile = async (fileName, currentDir) => {
    const filePath = getPath(currentDir, fileName);

    const fileExists = await checkIfPathExists(filePath);

    if (!fileExists) {
        console.log(INVALID_INPUT);

        return;
    }

    return fs.unlinkSync(filePath);
}

const renameFile = async (payload, currentDir) => {
    if (payload.length !== 2) {
        return INVALID_INPUT;
    }
    const pathToPrevFile = payload[0];
    const fileNewName = payload[1];

    const pathToFolder = getPath(currentDir, pathToPrevFile);

    const filePrevName = pathToFolder.split('/').pop();
    const pathToFile = path.dirname(pathToFolder);

    const filePathToRename = getPath(pathToFile, filePrevName);
    const filePathRenamed = getPath(pathToFile, fileNewName);

    const [
        fileToRenameExists,
        fileFinalExists
    ] = await Promise.all([
        checkIfPathExists(filePathToRename),
        checkIfPathExists(filePathRenamed)
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

const copyOrDeleteFile = async (payload, currentDir, deleteSrcFile = false) => {
    if (payload.length !== 2) {
        return INVALID_INPUT;
    }

    const srcFileDir = payload[0];
    const distDir = payload[1];

    const pathToSrcFolder = getPath(currentDir, srcFileDir);
    const fileName = pathToSrcFolder.split('/').pop();
    const pathToDistFolder = getPath(currentDir, distDir, fileName);

    if (!await checkIfPathExists(pathToSrcFolder)) {
        console.log(FILE_NOT_EXISTS);

        return;
    }

    if (await checkIfPathExists(pathToDistFolder)) {
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
        await Promise.resolve(checkIfPathExists(pathToDistFolder)).then(() =>
            fs.unlinkSync(pathToSrcFolder));
    }
}

export const readFile = async (payload, currentDir) => {
    const fileDir = getFirstArrayElem(payload);
    const filePath = getPath(currentDir, fileDir);

    if (!await checkIfPathExists(filePath)) {
        console.log(OPERATION_FAILED);

        return;
    }

    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(filePath);
        let result = '';

        readStream.on('error', (err) => reject(err));
        readStream.on('data', (chunk) => result += chunk);
        readStream.on('end', () => {
            displayResult(result);

            resolve(result)
        });
    });
}

export const filesController = async (cmd, payload, currentDir) => {
    if (!payload) {
        return INVALID_INPUT
    }

    switch (cmd) {
        case CAT:
            return readFile(payload, currentDir);
        case ADD:
            return createFile(payload, currentDir);
        case RN:
            return renameFile(payload, currentDir);
        case CP:
            return copyOrDeleteFile(payload, currentDir);
        case MV:
            return copyOrDeleteFile(payload, currentDir, true);
        case RM:
            return removeFile(payload.shift(), currentDir);
        default:
            return OPERATION_FAILED;
    }
};