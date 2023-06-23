export default class CurrentPath {
    static currentPath = process.cwd() || '';

    static setCurrentPath(newPath) {
        this.currentPath = newPath.trim();
    }

    static getCurrentPath() {
        return this.currentPath;
    }
}