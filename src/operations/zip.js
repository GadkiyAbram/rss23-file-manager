import {
    BR,
    COMPRESS,
    DECOMPRESS,
    FILE_ALREADY_EXISTS,
    INVALID_INPUT, OPERATION_FAILED
} from '../constants/commands.js';
import getPath from './utils/getPath.js';
import fs from 'fs';
import zlib from 'zlib';
import utils from './utils/index.mjs';

const {
    getFilenameNoExt,
    checkIfDirExists,
    getFilenameExt
} = utils;

const compressFile = async (fileToCompressPath, fileCompressedPath) => {
    const fileNameCompressed = `${getFilenameExt(fileToCompressPath)}${BR}`
    const fileCompressedPathNew = getPath(fileCompressedPath, fileNameCompressed);

    if (
        !await checkIfDirExists(fileToCompressPath) ||
        await checkIfDirExists(fileCompressedPathNew)
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
        !await checkIfDirExists(fileToDecompressPath) ||
        await checkIfDirExists(fileExtractPath)
    ) {
        return INVALID_INPUT
    }

    return Promise.resolve(
        fs.createReadStream(fileToDecompressPath)
            .pipe(zlib.createBrotliDecompress())
            .pipe(fs.createWriteStream(fileExtractPath))
    );
}

export const zipController = async (cmd, currentDir, srcFilePath, distFilePath) => {
    if (!srcFilePath || !distFilePath) {
        return INVALID_INPUT;
    }

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