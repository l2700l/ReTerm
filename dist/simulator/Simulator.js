var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useEffect, useRef, useState } from 'react';
import { Commands } from './commands';
import styles from './Simulator.module.css';
import { useDeviceData } from 'react-device-detect';
import { FS } from '../fs/fs';
import AppsProvider from '../applications/AppsProvider';
import { generateHelp } from '../other/help';
import IO from './IO';
var Simulator = function (_a) {
    var _b = _a.user, user = _b === void 0 ? 'user' : _b, _c = _a.name, name = _c === void 0 ? 'computer' : _c, _d = _a.prompt, prompt = _d === void 0 ? '$' : _d, borderRadius = _a.borderRadius, startMessage = _a.startMessage, _e = _a.theme, theme = _e === void 0 ? {
        simulatorBackground: '#282A34',
        computerTextColor: '#5FBDAD',
        atTextColor: '#75C6D0',
        pathTextColor: '#FF479C',
        outputTextColor: '#FFFFFF',
        userTextColor: '#A380DA',
        commandTextColor: '#7CC9DC',
    } : _e, _f = _a.fs, fs = _f === void 0 ? {} : _f, _g = _a.applications, applications = _g === void 0 ? {} : _g, _h = _a.builtInCommands, builtInCommands = _h === void 0 ? {
        help: true,
        ls: true,
        cd: true,
        cat: true,
        whoami: true,
        clear: true,
        mkdir: true,
        echo: true,
        rm: true,
        cp: true,
        rev: true
    } : _h;
    // region commands
    var _j = useState([]), commands = _j[0], setCommands = _j[1];
    var _k = useState(), command = _k[0], setCommand = _k[1];
    var _l = useState(), updatedCommand = _l[0], setUpdatedCommand = _l[1];
    var _m = useState(0), setHistoryIndex = _m[1];
    var filteredBuiltInCommands = useRef(Object.fromEntries(Object.entries(Commands).filter(function (params) { return (typeof builtInCommands[params[0]] === 'undefined' || builtInCommands[params[0]]); })));
    var handleHistory = function (e) {
        if (e.key === 'ArrowUp') {
            setHistoryIndex(function (prevState) {
                var state = prevState > 1 ? prevState - 1 : 0;
                setUpdatedCommand(commands[state]);
                return state;
            });
        }
        if (e.key === 'ArrowDown') {
            setHistoryIndex(function (prevState) {
                var state = prevState >= commands.length - 1
                    ? commands.length - 1
                    : prevState + 1;
                setUpdatedCommand(commands[state]);
                return state;
            });
        }
    };
    // endregion
    // region output
    var _o = useState(startMessage ? [{ output: startMessage, path: FS.getHome() }] : []), outputs = _o[0], setOutputs = _o[1];
    // endregion
    // region paths
    var homePath = useState(FS.getHome())[0];
    var _p = useState(FS.getHome()), currentPath = _p[0], setCurrentPath = _p[1];
    useEffect(function () {
        FS.import(fs);
    }, []);
    var cutHomePath = function (path) {
        if (path.slice(homePath.length).length > 0) {
            return '~/' + path.slice(homePath.length);
        }
        else {
            return '~';
        }
    };
    var cd = function (newPath) {
        if (currentPath === '' && newPath.startsWith('../')) {
            return '';
        }
        try {
            if (newPath !== '') {
                setCurrentPath(function (prevState) {
                    return FS._parsePath(prevState + '/' + newPath).join('/');
                });
            }
            return '';
        }
        catch (e) {
            return 'uncorrected path';
        }
    };
    var getPath = function (path) {
        return path.startsWith(homePath) ? cutHomePath(path) : path;
    };
    // endregion
    // region refs
    var inputRef = useRef(null);
    var divRef = useRef(null);
    var scrollToBottom = function () {
        var _a;
        if ((divRef === null || divRef === void 0 ? void 0 : divRef.current) !== undefined) {
            divRef.current.scrollTop = ((_a = divRef === null || divRef === void 0 ? void 0 : divRef.current) === null || _a === void 0 ? void 0 : _a.scrollHeight) || 0;
        }
    };
    // endregion
    // region another
    var _q = useState(useDeviceData(window.navigator.userAgent)), device = _q[0], setDevice = _q[1];
    var help = useState(generateHelp(applications))[0];
    // endregion
    var closeApp = function (output) {
        if (output === void 0) { output = ''; }
        setOutputs(function (prevState) { return __spreadArray(__spreadArray([], prevState, true), [{ output: output, path: currentPath }], false); });
        setCommand(undefined);
        setTimeout(function () { var _a; return (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); });
    };
    // region executor
    var finishExecute = function (command) {
        setCommands(function (prevState) {
            setHistoryIndex(prevState.length + 1);
            return __spreadArray(__spreadArray([], prevState, true), [command], false);
        });
        setUpdatedCommand(undefined);
        setTimeout(function () { return scrollToBottom(); });
    };
    var execute = function (command) {
        if (command === '') {
            setOutputs(function (prevState) { return __spreadArray(__spreadArray([], prevState, true), [
                { output: '', path: currentPath },
            ], false); });
            finishExecute(command);
            return;
        }
        var deviceData = useDeviceData(window.navigator.userAgent);
        var commandArray = command.split(' ');
        var isApplication = Object.keys(applications).includes(commandArray[0].toLowerCase());
        if (isApplication) {
            setCommand(command);
            setDevice(deviceData);
            finishExecute(command);
            return;
        }
        console.log(filteredBuiltInCommands.current);
        if (!isApplication &&
            !Object.keys(filteredBuiltInCommands.current).includes(commandArray[0].toLowerCase())) {
            setOutputs(function (prevState) { return __spreadArray(__spreadArray([], prevState, true), [
                { output: 'command not found: ' + commandArray[0], path: currentPath },
            ], false); });
            finishExecute(command);
            return;
        }
        else {
            setDevice(deviceData);
            switch (Commands[commandArray[0].toLowerCase()]) {
                case Commands.help:
                    setOutputs(function (prevState) { return __spreadArray(__spreadArray([], prevState, true), [
                        { output: help, path: currentPath },
                    ], false); });
                    break;
                case Commands.cd:
                    var path = commandArray[1];
                    if (!path) {
                        setOutputs(function (prevState) { return __spreadArray(__spreadArray([], prevState, true), [
                            { output: '', path: currentPath },
                        ], false); });
                        break;
                    }
                    var info_1 = cd(path);
                    setOutputs(function (prevState) { return __spreadArray(__spreadArray([], prevState, true), [
                        { output: info_1, path: currentPath },
                    ], false); });
                    break;
                case Commands.ls:
                    try {
                        var data = FS.getFolder(currentPath +
                            '/' +
                            commandArray.slice(1, commandArray.length).join(' '));
                        var lsOutput_1 = [];
                        Object.keys(data).forEach(function (key) {
                            lsOutput_1.push(key);
                        });
                        setOutputs(function (prevState) { return __spreadArray(__spreadArray([], prevState, true), [
                            { output: lsOutput_1.join('    '), path: currentPath },
                        ], false); });
                    }
                    catch (e) {
                        setOutputs(function (prevState) { return __spreadArray(__spreadArray([], prevState, true), [
                            { output: 'uncorrected path', path: currentPath },
                        ], false); });
                    }
                    break;
                case Commands.whoami:
                    setOutputs(function (prevState) { return __spreadArray(__spreadArray([], prevState, true), [
                        { output: user, path: currentPath },
                    ], false); });
                    break;
                case Commands.cat:
                    var catOutput_1 = FS.readFile(currentPath +
                        '/' +
                        commandArray.slice(1, commandArray.length).join(' '));
                    setOutputs(function (prevState) { return __spreadArray(__spreadArray([], prevState, true), [
                        {
                            output: catOutput_1,
                            path: currentPath,
                        },
                    ], false); });
                    break;
                case Commands.mkdir:
                    FS.write(currentPath + '/' + commandArray[1], {});
                    setOutputs(function (prevState) { return __spreadArray(__spreadArray([], prevState, true), [
                        { output: '', path: currentPath },
                    ], false); });
                    break;
                case Commands.cp:
                    var args = commandArray.slice(1).join(' ').split("'");
                    var cpFile = FS.readFile(currentPath + '/' + args[1]);
                    FS.write(args[3], cpFile);
                    break;
                case Commands.echo:
                    setOutputs(function (prevState) { return __spreadArray(__spreadArray([], prevState, true), [
                        {
                            output: commandArray.slice(1, commandArray.length).join(' '),
                            path: currentPath,
                        },
                    ], false); });
                    break;
                case Commands.rm:
                    var recursion = commandArray.length === 3 && commandArray[1] === '-R';
                    var rmPath = commandArray.length === 3 ? commandArray[2] : commandArray[1];
                    var rmOutput_1 = FS.remove(currentPath + '/' + rmPath, recursion);
                    setOutputs(function (prevState) { return __spreadArray(__spreadArray([], prevState, true), [
                        { output: rmOutput_1 || '', path: currentPath },
                    ], false); });
                    break;
                case Commands.rev:
                    setOutputs(function (prevState) { return __spreadArray(__spreadArray([], prevState, true), [
                        {
                            output: commandArray
                                .slice(1, commandArray.length)
                                .join(' ')
                                .split('')
                                .reverse()
                                .join(''),
                            path: currentPath,
                        },
                    ], false); });
                    break;
                case Commands.clear:
                    setCommands([]);
                    setOutputs(startMessage ? [{ output: startMessage, path: currentPath }] : []);
                    setHistoryIndex(0);
                    return;
            }
        }
        finishExecute(command);
    };
    // endregion
    return (React.createElement("div", { ref: divRef, className: styles.simulator, style: {
            borderTopLeftRadius: (borderRadius === null || borderRadius === void 0 ? void 0 : borderRadius.topLeft)
                ? borderRadius === null || borderRadius === void 0 ? void 0 : borderRadius.topLeft
                : 0,
            borderTopRightRadius: (borderRadius === null || borderRadius === void 0 ? void 0 : borderRadius.topRight)
                ? borderRadius === null || borderRadius === void 0 ? void 0 : borderRadius.topRight
                : 0,
            borderBottomLeftRadius: (borderRadius === null || borderRadius === void 0 ? void 0 : borderRadius.bottomLeft)
                ? borderRadius === null || borderRadius === void 0 ? void 0 : borderRadius.bottomLeft
                : 0,
            borderBottomRightRadius: (borderRadius === null || borderRadius === void 0 ? void 0 : borderRadius.bottomRight)
                ? borderRadius === null || borderRadius === void 0 ? void 0 : borderRadius.bottomRight
                : 0,
            '--simulatorBackground': theme.simulatorBackground,
            '--computerTextColor': theme.computerTextColor,
            '--atTextColor': theme.atTextColor,
            '--pathTextColor': theme.pathTextColor,
            '--outputTextColor': theme.outputTextColor,
            '--userTextColor': theme.userTextColor,
            '--commandTextColor': theme.commandTextColor,
        }, onKeyDownCapture: handleHistory, onClick: function () {
            var _a;
            (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        } },
        React.createElement(AppsProvider, { closeApp: closeApp, value: { user: user, name: name, path: currentPath, device: device }, command: command, applications: applications },
            React.createElement(IO, { outputs: outputs, user: user, name: name, getPath: getPath, commands: commands, inputRef: inputRef, currentPath: currentPath, execute: execute, prompt: prompt, startMessage: startMessage, updatedCommand: updatedCommand, show: !!command }))));
};
export default Simulator;
//# sourceMappingURL=Simulator.js.map