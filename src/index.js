import User from './Entities/User.js';
import {MOVE_DIRECTORY_DEFAULT_AND_PRINT} from './constants/consts.js';
import {handleCommand} from './cmdController.js';
import {execute} from './operations/nwd.js';
import CurrentPath from './Entities/CurrentPath.js';

const init = async (args) => {
    const userNameData = args[0].split('=');
    const user = new User(userNameData[1]);

    console.log(`Welcome to the File Manager, ${user.getUserName()}!`);

    const currentDir = await execute(MOVE_DIRECTORY_DEFAULT_AND_PRINT) || process.cwd();
    CurrentPath.setCurrentPath(currentDir);

    return {
        user,
        currentDir: currentDir || process.cwd()
    };
}

async function workingWithFM() {
    const {user, currentDir} = await init(process.argv.slice(2));

    process.stdin.on('data', async (commandData) => {
        await handleCommand(commandData.toString().trim());
    });

    process.stdin.on('exit', () => {
        console.log(`Thank you for using File Manager, ${user.getUserName()}, goodbye!`);
    });
}

await workingWithFM();