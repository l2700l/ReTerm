import React from 'react';
import LineStart from './LineStart';
import styles from '../simulator/Simulator.module.css';
var Output = function (_a) {
    var user = _a.user, name = _a.name, path = _a.path, command = _a.command, prompt = _a.prompt, children = _a.children, _b = _a.lineStart, lineStart = _b === void 0 ? true : _b;
    return (React.createElement(React.Fragment, null,
        lineStart && (React.createElement(LineStart, { user: user, name: name, path: path, prompt: prompt }, command)),
        React.createElement("span", { className: styles.simulator__line }, children)));
};
export default React.memo(Output);
//# sourceMappingURL=Output.js.map