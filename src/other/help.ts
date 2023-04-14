import { TermApp } from '../interfaces/TermApp';

export const generateHelp = (applications: Record<string, TermApp>): string => {
  let base = `command <required> [optional]

usage:

ls [path]
    – show files and directories
cd <path>
    – change directory
cat <path to file>
    – read file
whoiam
    – show user
mkdir <path>
    – create directory
rm [-R] <path>
    - remove file or directory
cp <'path from'> <'path to'>
    - copy file
echo <data>
    – write to output
clear
    – clear outputs & commands
rev
    - expand string
${
  Object.keys(applications).length > 0
    ? `

programs:

`
    : ''
}`;
  for (let command in applications) {
    base += `${applications[command].help?.template || command} ${
      applications[command].help?.description
        ? `\n    - ${applications[command].help?.description}\n`
        : '\n'
    }`;
  }
  return base;
};
