import {
    EOL,
    CPUS,
    INVALID_INPUT,
    OPERATION_FAILED,
    GHZ_DEVIDER,
    GHZ,
    USERNAME,
    HOMEDIR,
    ARCH,
    OS_OPERATIONS
} from '../constants/consts.js';
import os from 'os';
import {displayResult} from "./utils/displayResult.js";

const getEOL = () => {
    return JSON.stringify(os.EOL);
}

const getCPUS = () => {
    const cpuData = os.cpus();

    const cpuAmount = cpuData.length;
    const cpuModel = cpuData[0].model;

    console.log(`CPU amount: ${cpuAmount}`);
    console.log(`CPU Model: ${cpuModel}`);
    console.log(`Clock rate (in ${GHZ}):`);
    cpuData.map((cpuItem, idx) => {
        console.log(`${idx}: ${cpuItem.speed / GHZ_DEVIDER}`);
    });
}

const getUserName = () => {
    return os?.userInfo().username;
}

const getHomedir = () => {
    return os?.homedir();
}

const getArch = () => {
    return process.arch;
}
export const osController = async (cmd, payload) => {
    const payloadAsString = payload.join();

    if (!payloadAsString || !OS_OPERATIONS.includes(payloadAsString)) {
        displayResult(INVALID_INPUT);

        return;
    }

    switch (payloadAsString) {
        case EOL:
            displayResult(getEOL());

            break;
        case CPUS:
            return getCPUS();
        case USERNAME:
            displayResult(getUserName());

            break;
        case HOMEDIR:
            displayResult(getHomedir());

            break;
        case ARCH:
            displayResult(getArch());

            break;
        default:
            displayResult(OPERATION_FAILED);

            return;
    }
}