import React from 'react';
var AppsProvider = function (_a) {
    var children = _a.children, closeApp = _a.closeApp, value = _a.value, command = _a.command, applications = _a.applications;
    var switchApp = function () {
        if (command === undefined)
            return children;
        return applications[command.split(' ')[0]].execute(command || '', closeApp, value);
    };
    return React.createElement(React.Fragment, null, switchApp());
};
export default AppsProvider;
//# sourceMappingURL=AppsProvider.js.map