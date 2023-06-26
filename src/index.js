import User from './Entities/User.js';
import {
    EXIT,
    MOVE_DIRECTORY_DEFAULT_AND_PRINT
} from './constants/consts.js';
import {execute} from './controllers/nwd.js';
import CurrentPath from './Entities/CurrentPath.js';
import {handleCommand} from './main.js';

const init = async (args) => {
    const userNameData = args[0].split('=');
    const user = new User(userNameData[1]);

    console.log(`Welcome to the File Manager, ${user.getUserName()}!`);

    const currentDir = await execute(MOVE_DIRECTORY_DEFAULT_AND_PRINT) || process.cwd();
    CurrentPath.setCurrentPath(currentDir);
    CurrentPath.printCurrentDirectory();

    return {
        user,
        currentDir: currentDir || process.cwd()
    };
}

const byeByeUser = (userName) => {
    console.log(`\nThank you for using File Manager, ${userName}, goodbye!`);
}

async function workingWithFM() {
    const {user, currentDir} = await init(process.argv.slice(2));

    process.stdin.on('data', async (commandData) => {
        const cmd = commandData.toString().trim();

        if (cmd === EXIT) {
            byeByeUser(user.getUserName());
            process.exit(0);
        }

        await handleCommand(commandData.toString().trim());
        CurrentPath.printCurrentDirectory();
    });

    process.on('SIGINT', () => {
        byeByeUser(user.getUserName());
        process.exit(0);
    });
}

await workingWithFM();