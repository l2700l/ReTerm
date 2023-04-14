export var generateHelp = function (applications) {
    var _a, _b, _c;
    var base = "command <required> [optional]\n\nusage:\n\nls [path]\n    \u2013 show files and directories\ncd <path>\n    \u2013 change directory\ncat <path to file>\n    \u2013 read file\nwhoiam\n    \u2013 show user\nmkdir <path>\n    \u2013 create directory\nrm [-R] <path>\n    - remove file or directory\ncp <'path from'> <'path to'>\n    - copy file\necho <data>\n    \u2013 write to output\nclear\n    \u2013 clear outputs & commands\nrev\n    - expand string\n".concat(Object.keys(applications).length > 0
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