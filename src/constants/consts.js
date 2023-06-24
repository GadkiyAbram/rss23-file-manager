// cmd
export const FILE = 'file';
export const DIRECTORY = 'directory';
export const MOVE_DIRECTORY_DEFAULT_AND_PRINT = 'cd ~/ && pwd';
export const AND_PWD = '&& pwd';
export const CD_UP = '../';
export const UP = 'up';
export const LS = 'ls';
export const CD = 'cd';

export const NWD_OPERATIONS = [UP, LS, CD];

// os
export const OS = 'os';
export const EOL = '--EOL';
export const CPUS = '--cpus';
export const USERNAME = '--username';
export const HOMEDIR = '--homedir';
export const ARCH = '--architecture';
export const GHZ = 'GHz';
export const GHZ_DEVIDER = 1000;

export const OS_OPERATIONS = [
  EOL, CPUS, USERNAME, ARCH, HOMEDIR
];

// files cmd
export const CAT = 'cat';
export const ADD = 'add';
export const RN = 'rn';
export const CP = 'cp';
export const MV = 'mv';
export const RM = 'rm';

export const FILES_OPERATIONS = [
    CAT, ADD, RN, CP, MV, RM
];

export const HASH = 'hash';

export const COMPRESS = 'compress';
export const DECOMPRESS = 'decompress';

export const ZIP_OPERATIONS = [
    COMPRESS, DECOMPRESS
]

// err
export const INVALID_INPUT = 'Invalid input';
export const OPERATION_FAILED = 'Operation failed';
export const FILE_NOT_EXISTS = 'File not exists';
export const FILE_ALREADY_EXISTS = 'File already exists';
export const DIRECTORY_NOT_EXISTS = 'Directory not exists';

// hash encoding
export const SHA256 = 'sha256';

// ext
export const BR = '.br';