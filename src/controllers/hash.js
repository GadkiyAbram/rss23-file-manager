import {
    FILE_NOT_EXISTS,
    HASH,
    INVALID_INPUT, OPERATION_FAILED,
    SHA256
} from '../constants/consts.js';
import crypto from 'crypto';
import fs from 'fs';
import utils from '../utils/index.mjs';

const {
    getPath,
    checkIfPathExists,
    displayResult
} = utils;

const hashFile = async (currentDir, fileDir) => {
    const filePath = getPath(currentDir, fileDir);

    if (!await checkIfPathExists(filePath)) {
        return FILE_NOT_EXISTS;
    }

    return new Promise((resolve, reject) => {
       const hash = crypto.createHash(SHA256);
       const stream = fs.createReadStream(filePath);

        stream
            .on('error', (err) => reject(err))
            .on('data', (chunk) => hash.update(chunk.toString()))
            .on('end', () => resolve(hash.digest('hex')));
    });
}

export const hashController = async (cmd, payload, currentDir) => {
    if (!payload.length) {
        displayResult( INVALID_INPUT);

        return;
    }

    switch (cmd) {
        case HASH:
            displayResult(await hashFile(currentDir, payload[0]));

            return;
        default:
            return OPERATION_FAILED;
    }
}