import {
    FILES_OPERATIONS,
    HASH,
    ZIP_OPERATIONS,
    OS,
    NWD_OPERATIONS, INVALID_INPUT
} from './constants/consts.js';
import {filesController} from './operations/files.js';
import {hashController} from './operations/hash.js';
import {zipController} from './operations/zip.js';
import {osController} from './operations/os.js';
import {nwdController} from './operations/nwd.js';
import CurrentPath from './Entities/CurrentPath.js';
import {displayResult} from "./operations/utils/displayResult.js";

export const handleCommand = async (commandData) => {
    const cmdDataAsArray = commandData.split(' ');
    const cmd = cmdDataAsArray.shift();
    const currentDir = CurrentPath.getCurrentPath();

    // const payload = cmdDataAsArray.slice(1);
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