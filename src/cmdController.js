import {
    FILES_OPERATIONS,
    HASH,
    ZIP_OPERATIONS,
    OS,
    NWD_OPERATIONS
} from './constants/commands.js';
import {filesController} from './operations/files.js';
import {hashController} from './operations/hash.js';
import {zipController} from './operations/zip.js';
import {osController} from './operations/os.js';
import {nwdController} from './operations/nwd.js';

export const handleCommand = async (commandData, currentDir) => {
    const cmdDataAsArray = commandData.split(' ');
    const cmd = cmdDataAsArray[0];
    let payload = cmdDataAsArray.slice(1);

    if (FILES_OPERATIONS.includes(cmd)) {
        return filesController(cmd, payload, currentDir);
    }

    if (cmd === HASH) {
        return hashController(cmd, payload, currentDir);
    }

    if (ZIP_OPERATIONS.includes(cmd)) {
        return zipController(cmd, currentDir, payload[0], payload[1]);
    }

    if (cmd === OS) {
        return osController(cmd, payload);
    }

    if (NWD_OPERATIONS.includes(cmd)) {
        return nwdController(cmd, currentDir, payload);
    }
}