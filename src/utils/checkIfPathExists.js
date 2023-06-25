import fs from 'fs';

const checkIfPathExists = (pathToCheck) => {
    return fs.promises.access(pathToCheck, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false)
}

export default checkIfPathExists;