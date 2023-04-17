export var generateHelp = function (builtInApplications, applications) {
    var _a, _b, _c;
    var base = "command <required> [optional]\n\nusage:\n".concat(builtInApplications.ls && "\nls [path]\n    \u2013 show files and directories" || '').concat(builtInApplications.cd && "\ncd <path>\n    \u2013 change directory" || '').concat(builtInApplications.cat && "\ncat <path to file>\n    \u2013 read file" || '').concat(builtInApplications.whoami && "\nwhoiam\n    \u2013 show user" || '').concat(builtInApplications.mkdir && "\nmkdir <path>\n    \u2013 create directory" || '').concat(builtInApplications.rm && "\nrm [-R] <path>\n    - remove file or directory" || '').concat(builtInApplications.cp && "\ncp <'path from'> <'path to'>\n    - copy file" || '').concat(builtInApplications.echo && "\necho <data>\n    \u2013 write to output" || '').concat(builtInApplications.clear && "\nclear\n    \u2013 clear outputs & commands" || '').concat(builtInApplications.rev && "\nrev\n    - expand string" || '', "\n").concat(Object.keys(applications).length > 0
        ? "\n\nprograms:\n\n"
        : '');
    for (var command in applications) {
        base += "".concat(((_a = applications[command].help) === null || _a === void 0 ? void 0 : _a.template) || command, " ").concat(((_b = applications[command].help) === null || _b === void 0 ? void 0 : _b.description)
            ? "\n    - ".concat((_c = applications[command].help) === null || _c === void 0 ? void 0 : _c.description, "\n")
            : '\n');
    }
    return base;
};
//# sourceMappingURL=help.js.map