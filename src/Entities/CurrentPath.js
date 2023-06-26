import utils from '../utils/index.mjs';

export default class CurrentPath {
    static currentPath = process.cwd() || '';

    static setCurrentPath(newPath) {
        this.currentPath = newPath.trim();
    }

    static getCurrentPath() {
        return this.currentPath;
    }

    static printCurrentDirectory() {
        utils.displayResult(`You are currently in ${this.currentPath}`);
    }
}