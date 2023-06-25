import {
    FILES_OPERATIONS,
    HASH,
    ZIP_OPERATIONS,
    OS,
    NWD_OPERATIONS,
    INVALID_INPUT
} from './constants/consts.js';
import CurrentPath from './Entities/CurrentPath.js';
import controllers from './controllers/index.mjs';
import utils from './utils/index.mjs';

const {
    filesController,
    hashController,
    zipController,
    osController,
    nwdController
} = controllers;
const {displayResult} = utils;

export const handleCommand = async (commandData) => {
    const cmdDataAsArray = commandData.split(' ');
    const cmd = cmdDataAsArray.shift();
    const currentDir = CurrentPath.getCurrentPath();

    const payload = cmdDataAsArray;

    if (NWD_OPERATIONS.includes(cmd)) {
        return nwdController(cmd, payload, currentDir);
    }

    if (FILES_OPERATIONS.includes(cmd)) {
        return filesController(cmd, payload, currentDir);
    }

    if (cmd === OS) {
        return osController(cmd, payload);
    }

    if (cmd === HASH) {
        return hashController(cmd, payload, currentDir);
    }

    if (ZIP_OPERATIONS.includes(cmd)) {
        return zipController(cmd, payload, currentDir);
    }

    displayResult(INVALID_INPUT);
}