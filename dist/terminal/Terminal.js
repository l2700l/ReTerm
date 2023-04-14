import React, { useEffect, useState } from 'react';
import styles from './Terminal.module.css';
import Simulator from '../simulator/Simulator';
import Buttons from './Buttons';
var Terminal = function (_a) {
    var _b = _a.user, user = _b === void 0 ? 'user' : _b, _c = _a.name, name = _c === void 0 ? 'computer' : _c, _d = _a.prompt, prompt = _d === void 0 ? '$' : _d, startMessage = _a.startMessage, _e = _a.theme, theme = _e === void 0 ? {
        simulatorBackground: '#282A34',
        computerTextColor: '#5FBDAD',
        atTextColor: '#75C6D0',
        pathTextColor: '#FF479C',
        outputTextColor: '#FFFFFF',
        userTextColor: '#A380DA',
        commandTextColor: '#7CC9DC',
    } : _e, _f = _a.fs, fs = _f === void 0 ? {} : _f, _g = _a.applications, applications = _g === void 0 ? {} : _g;
    var _h = useState(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'), orientation = _h[0], setOrientation = _h[1];
    var handleResize = function () {
        if (window.innerWidth > window.innerHeight) {
            setOrientation('landscape');
        }
        else {
            setOrientation('portrait');
        }
    };
    useEffect(function () {
        window.addEventListener('resize', handleResize);
        return function () { return window.removeEventListener('resize', handleResize); };
    }, []);
    return (React.createElement(React.Fragment, null, orientation === 'landscape' ? (React.createElement("div", { className: styles.terminal },
        React.createElement("div", { className: styles.terminal__top },
            React.createElement(Buttons, null),
            React.createElement("div", { className: styles.terminal__header },
                user,
                "@",
                name)),
        React.createElement(Simulator, { name: name, user: user, prompt: prompt, borderRadius: { bottomLeft: '0.5rem', bottomRight: '0.5rem' }, startMessage: startMessage, theme: theme, fs: fs, applications: applications }))) : (React.createElement("h2", { style: { textAlign: 'center' } },
        "Use ",
        React.createElement("i", null, "landscape"),
        " orientation!"))));
};
export default Terminal;
//# sourceMappingURL=Terminal.js.map