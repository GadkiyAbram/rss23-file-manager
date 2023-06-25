import {
    BR,
    COMPRESS,
    DECOMPRESS,
    FILE_ALREADY_EXISTS, FILE_NOT_EXISTS,
    INVALID_INPUT, OPERATION_FAILED
} from '../constants/consts.js';
import getPath from '../utils/getPath.js';
import fs from 'fs';
import zlib from 'zlib';
import utils from '../utils/index.mjs';
import CurrentPath from '../Entities/CurrentPath.js';

const {
    getFilenameNoExt,
    checkIfPathExists,
    getFilenameExt
} = utils;

const compressFile = async (fileToCompressPath, fileCompressedPath) => {
    const fileNameCompressed = `${getFilenameExt(fileToCompressPath)}${BR}`
    const fileCompressedPathNew = getPath(fileCompressedPath, fileNameCompressed);

    if (
        !await checkIfPathExists(fileToCompressPath) ||
        await checkIfPathExists(fileCompressedPathNew)
    ) {
        return FILE_ALREADY_EXISTS;
    }

    return Promise.resolve(
        fs.createReadStream(fileToCompressPath)
            .pipe(zlib.createBrotliCompress())
            .pipe(fs.createWriteStream(fileCompressedPathNew))
    );
}

const decompressFile = async (fileCompressed, fileToDecompress) => {
    const fileName = getFilenameNoExt(getFilenameExt(fileToDecompress));
    const fileToDecompressPath = getPath(fileToDecompress);
    const fileExtractPath = getPath(fileCompressed, fileName);

    if (
        !await checkIfPathExists(fileToDecompressPath) ||
        await checkIfPathExists(fileExtractPath)
    ) {
        return INVALID_INPUT
    }

    return Promise.resolve(
        fs.createReadStream(fileToDecompressPath)
            .pipe(zlib.createBrotliDecompress())
            .pipe(fs.createWriteStream(fileExtractPath))
    );
}

export const zipController = async (cmd, payload) => {
    if (payload.length !== 2) {
        return INVALID_INPUT;
    }

    const srcFilePath = payload[0];
    const distFilePath = payload[1];

    if (!srcFilePath || !distFilePath) {
        return FILE_NOT_EXISTS;
    }

    const currentDir = CurrentPath.getCurrentPath();

    const fileToCompressPath = getPath(currentDir, srcFilePath);
    const fileCompressedPath = getPath(currentDir, distFilePath);

    switch (cmd) {
        case COMPRESS:
            return await compressFile(fileToCompressPath, fileCompressedPath);
        case DECOMPRESS:
            return await decompressFile(fileCompressedPath, fileToCompressPath);
        default:
            return OPERATION_FAILED;
    }
}