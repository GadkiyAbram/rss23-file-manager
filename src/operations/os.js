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
} from '../constants/commands.js';
import os from 'os';

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
    if (!payload || !OS_OPERATIONS.includes(payload)) {
        return INVALID_INPUT;
    }

    const payloadAsString = payload.join();

    switch (payloadAsString) {
        case EOL:
            return getEOL();
        case CPUS:
            return getCPUS();
        case USERNAME:
            return getUserName();
        case HOMEDIR:
            return getHomedir();
        case ARCH:
            return getArch();
        default:
            return OPERATION_FAILED;
    }
}