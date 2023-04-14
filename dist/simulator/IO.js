import React from 'react';
import Output from '../lines/Output';
import styles from './Simulator.module.css';
import Input from '../lines/Input';
var IO = function (_a) {
    var outputs = _a.outputs, user = _a.user, name = _a.name, getPath = _a.getPath, startMessage = _a.startMessage, commands = _a.commands, currentPath = _a.currentPath, updatedCommand = _a.updatedCommand, execute = _a.execute, prompt = _a.prompt, inputRef = _a.inputRef, show = _a.show;
    return (React.createElement("div", { hidden: show },
        outputs.map(function (output, index) { return (React.createElement(Output, { key: index, user: user, name: name, path: getPath(output.path), lineStart: !startMessage || index !== 0, command: startMessage ? commands[index - 1] : commands[index], prompt: prompt }, output.output)); }),
        React.createElement("div", { className: styles.simulator__input },
            React.createElement(Input, { user: user, name: name, ref: inputRef, path: getPath(currentPath), execute: execute, updatedCommand: updatedCommand, prompt: prompt }))));
};
export default IO;
//# sourceMappingURL=IO.js.map