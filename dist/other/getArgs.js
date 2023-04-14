export var getArgs = function (command) {
    var argsArray = command.split(' ').slice(1);
    return { argsArray: argsArray, argsString: argsArray.join(' ') };
};
//# sourceMappingURL=getArgs.js.map