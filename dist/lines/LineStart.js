import React from 'react';
import styles from '../simulator/Simulator.module.css';
var LineStart = function (_a) {
    var user = _a.user, name = _a.name, path = _a.path, _b = _a.prompt, prompt = _b === void 0 ? '$' : _b, children = _a.children;
    return (React.createElement("span", { className: styles.simulator__line_padding },
        React.createElement("span", { className: styles.simulator__user }, user),
        React.createElement("span", { className: styles.simulator__at }, "@"),
        React.createElement("span", { className: styles.simulator__computer }, name),
        React.createElement("span", null, ":"),
        " ",
        React.createElement("span", { className: styles.simulator__path }, path),
        ' ',
        React.createElement("span", null, prompt),
        ' ',
        children && (React.createElement("span", { className: styles.simulator__command }, children))));
};
export default React.memo(LineStart);
//# sourceMappingURL=LineStart.js.map