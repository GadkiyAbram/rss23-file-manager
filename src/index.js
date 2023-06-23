import User from './userHandling/User.js';
import {exec} from 'child_process';
import {MOVE_DIRECTORY_DEFAULT_AND_PRINT} from './constants/commands.js';
import {handleCommand} from './cmdController.js';
import {execute} from './operations/nwd.js';
import CurrentPath from './userHandling/CurrentPath.js';

// const execute = async (command) => {
//     return new Promise((resolve, reject) => {
//         exec(command, (err, stdout, stderr) => {
//             if (err) {
//                 console.log(`error: ${err.message}`);
//                 return;
//             }
//
//             if (stderr) {
//                 console.log(`stderr: ${stderr}`);
//                 return;
//             }
//
//             console.log(stdout);
//
//             resolve(stdout);
//         })
//     });
// }

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

    // console.log(`Welcome to the File Manager, ${user.getUserName()}!`);
    // console.log(`You are currently in ${CurrentPath.getCurrentPath()}`);

    process.stdin.on('data', async (commandData) => {
        // console.log(await handleCommand(commandData.toString().trim(), currentDir.toString().trim()) || '');
        await handleCommand(commandData.toString().trim(), currentDir.toString().trim());
    });

    process.stdin.on('exit', () => {
        console.log(`Thank you for using File Manager, ${user.getUserName()}, goodbye!`);
    });
}

await workingWithFM();