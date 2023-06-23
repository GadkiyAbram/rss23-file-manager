import {
    AND_PWD,
    CD,
    CD_UP, DIRECTORY, FILE,
    INVALID_INPUT,
    LS,
    UP
} from '../constants/commands.js';
import {exec} from 'child_process';
import getPath from './utils/getPath.js';
import CurrentPath from '../userHandling/CurrentPath.js';
import fs from 'fs';

export const execute = async (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }

            if (stderr) {
                return;
            }

            console.log(`You are currently in ${stdout}`);

            resolve(stdout);
        })
    });
}

const navigateToDir = async (cmd, currentDir = '', dirPath = '') => {
    const fullPath = getPath(CurrentPath.getCurrentPath(), dirPath);

    const cmdFull = `${cmd} ${fullPath} ${AND_PWD}`;
    const result = await execute(cmdFull);

    CurrentPath.setCurrentPath(result);

    return result;
}

const navigateUp = async () => {
    return navigateToDir(CD, '', CD_UP);
}

const listContents = async () => {
    const dirPath = getPath(CurrentPath.getCurrentPath());

    const itemsInDir = fs.readdirSync(dirPath);

    const preparedData = itemsInDir.map((item) => {
        const filePath = getPath(dirPath, item);
        const itemType = fs.lstatSync(filePath).isFile() ? FILE : DIRECTORY;

        return {
            Name: item,
            Type: itemType
        }
    });

    console.table(preparedData);
}

export const nwdController = async (cmd, currentDir, payload) => {
    if (cmd === CD && !payload) {
        return INVALID_INPUT;
    }

    switch (cmd) {
        case CD:
            return navigateToDir(cmd, currentDir, payload[0]);
        case UP:
            return navigateUp(cmd);
        case LS:
            return listContents();
    }
}