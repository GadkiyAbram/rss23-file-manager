import {
    AND_PWD,
    CD,
    CD_UP,
    DIRECTORY,
    DIRECTORY_NOT_EXISTS,
    FILE,
    INVALID_INPUT,
    LS,
    OPERATION_FAILED,
    UP
} from '../constants/consts.js';
import {exec} from 'child_process';
import getPath from '../utils/getPath.js';
import CurrentPath from '../Entities/CurrentPath.js';
import fs from 'fs';
import utils from '../utils/index.mjs';

const {
    checkIfPathExists,
    displayResult
} = utils;

export const execute = async (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }

            if (stderr) {
                return;
            }

            resolve(stdout);
        })
    });
}

const prepareTableData = (itemsData, dirPath, needleType) => {
    return itemsData.reduce((acc, item) => {
        const filePath = getPath(dirPath, item);
        const itemStatSync = fs.lstatSync(filePath);

        const itemType =
            needleType === DIRECTORY ?
                itemStatSync.isDirectory() :
                itemStatSync.isFile();

        if (itemType) {
            acc.push({
                Name: item,
                Type: needleType
            });
        }

        return acc;
    }, []).sort((a, b) => a?.Name.localeCompare(b?.Name));
};

const navigateToDir = async (cmd, dirPath = '', currentDir) => {
    const fullPath = getPath(currentDir, dirPath);

    const cmdFull = `${cmd} ${fullPath} ${AND_PWD}`;

    if (!await checkIfPathExists(fullPath)) {
        displayResult(DIRECTORY_NOT_EXISTS);

        return;
    }

    let result = '';

    try {
        result = await execute(cmdFull);
        CurrentPath.setCurrentPath(result);
    } catch (_) {
        return OPERATION_FAILED;
    }

    return result;
}

const navigateUp = async (currentDir) => {
    return navigateToDir(CD, CD_UP, currentDir);
}

const listContents = async (currentDir) => {
    const dirPath = getPath(currentDir);

    const itemsInDir = fs.readdirSync(dirPath);

    const preparedDirectories = prepareTableData(itemsInDir, dirPath, DIRECTORY);
    const preparedFiles = prepareTableData(itemsInDir, dirPath, FILE);

    const resultTableData = [...preparedDirectories, ...preparedFiles];

    console.table(resultTableData);
}

export const nwdController = async (cmd, payload, currentDir) => {
    if (cmd === CD && !payload) {
        return INVALID_INPUT;
    }

    switch (cmd) {
        case CD:
            return navigateToDir(cmd, payload[0], currentDir);
        case UP:
            return navigateUp(currentDir);
        case LS:
            return listContents(currentDir);
    }
}