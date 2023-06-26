Task Description: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md
Deadline Date: 2023-06-27
Self-assessment review:

General:
[V] Application accepts username and prints proper message (6/6)
[V] Application exits if user pressed ctrl+c or sent .exit command and proper message is printed (10/10)

Operations fail:
[V] Attempts to perform an operation on a non-existent file or work on a non-existent path result in the operation fail (20/20)
[V] Operation fail doesn't crash application (10/10)

Navigation & working directory operations implemented properly:
[V] Go upper from current directory (10/10)
[V] Go to dedicated folder from current directory (10/10)
[V] List all files and folders in current directory (20/20)

Basic operations with files implemented properly
[V] Read file and print it's content in console (10/10)
[V] Create empty file (10/10)
[V] Rename file (10/10)
[V] Copy file (10/10)
[V] Move file (10/10)
[V] Delete file (10/10)

Operating system info (prints following information in console) implemented properly:
[V] Get EOL (default system End-Of-Line) (6/6)
[V] Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) (10/10)
[V] Get home directory (6/6)
[V] Get current system user name (Do not confuse with the username that is set when the application starts) (6/6)
[V] Get CPU architecture for which Node.js binary has compiled (6/6)

Hash calculation implemented properly:
[20] Calculate hash for file (20/20)

Compress and decompress operations:
[V] Compress file (using Brotli algorithm) (20/20)
[V] Decompress file (using Brotli algorithm) (20/20)

Advanced Scope:
[V] All operations marked as to be implemented using certain streams should be performed using Streams API (30/30)
[V] No synchronous Node.js API with asynchronous analogues is used (e.g. not used readFileSync instead of readFile) (20/20)
[V] Codebase is written in ESM modules instead of CommonJS (20/20)
[V] Codebase is separated (at least 7 modules) (20/20)

Total Score: 330 from 330