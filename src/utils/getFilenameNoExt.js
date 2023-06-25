import path from 'path';

export const getFilenameNoExt = (filePath) => path.parse(filePath).name;