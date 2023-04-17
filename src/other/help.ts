import { TermApp } from '../interfaces/TermApp';
import { Commands } from '../simulator/commands';

export const generateHelp = (builtInApplications: Partial<Record<Commands, boolean>>, applications: Record<string, TermApp>): string => {
  let base = `command <required> [optional]

usage:
${builtInApplications.ls && `\nls [path]
    – show files and directories` || ''}\
${builtInApplications.cd && `\ncd <path>
    – change directory` || ''}\
${builtInApplications.cat && `\ncat <path to file>
    – read file` || ''}\
${builtInApplications.whoami && `\nwhoiam
    – show user` || ''}\
${builtInApplications.mkdir && `\nmkdir <path>
    – create directory` || ''}\
${builtInApplications.rm && `\nrm [-R] <path>
    - remove file or directory` || ''}\
${builtInApplications.cp && `\ncp <'path from'> <'path to'>
    - copy file` || ''}\
${builtInApplications.echo && `\necho <data>
    – write to output` || ''}\
${builtInApplications.clear && `\nclear
    – clear outputs & commands` || ''}\
${builtInApplications.rev && `\nrev
    - expand string` || ''}
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
