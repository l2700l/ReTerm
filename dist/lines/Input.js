import React, { useEffect, useState } from 'react';
import LineStart from './LineStart';
import styles from '../simulator/Simulator.module.css';
var Input = React.forwardRef(function (_a, ref) {
    var user = _a.user, name = _a.name, path = _a.path, updatedCommand = _a.updatedCommand, execute = _a.execute, prompt = _a.prompt;
    var _b = useState(''), command = _b[0], setCommand = _b[1];
    useEffect(function () {
        if (updatedCommand) {
            setCommand(updatedCommand);
        }
    }, [updatedCommand]);
    var handleExecute = function (e) {
        if (e.code === 'Enter') {
            execute(command);
            setCommand('');
            // @ts-ignore
            ref.current.focus();
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(LineStart, { user: user, name: name, path: path, prompt: prompt }),
        React.createElement("input", { ref: ref, className: styles.simulator__command, value: command, onChange: function (e) { return setCommand(e.target.value); }, onKeyDown: handleExecute })));
});
export default Input;
//# sourceMappingURL=Input.js.map