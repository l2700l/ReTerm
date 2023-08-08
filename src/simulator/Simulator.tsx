import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Commands } from './commands';
import styles from './Simulator.module.scss';
import { useDeviceData } from 'react-device-detect';
import { FS } from '../fs/fs';
import AppsProvider from '../applications/AppsProvider';
import { generateHelp } from '../other/help';
import { device } from '../interfaces/TermApp';
import { SimulatorProps } from '../interfaces/Simulator';
import IO from './IO';

const Simulator: React.FC<SimulatorProps> = ({
  user = 'user',
  name = 'computer',
  prompt = '$',
  borderRadius,
  startMessage,
  theme = {
    simulatorBackground: '#282A34',
    computerTextColor: '#5FBDAD',
    atTextColor: '#75C6D0',
    pathTextColor: '#FF479C',
    outputTextColor: '#FFFFFF',
    userTextColor: '#A380DA',
    commandTextColor: '#7CC9DC',
  },
  fs = {},
  applications = {},
  builtInCommands= {
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
  }
}) => {
  // region commands
  const [commands, setCommands] = useState<Array<string>>([]);
  const [command, setCommand] = useState<string | undefined>();
  const [updatedCommand, setUpdatedCommand] = useState<string | undefined>();
  const [, setHistoryIndex] = useState(0);
  const filteredBuiltInCommands = useRef<Partial<Record<Commands, boolean>>>(Object.fromEntries(Object.entries(Commands).filter((params) => (typeof builtInCommands[params[0] as keyof typeof builtInCommands] === 'undefined' || builtInCommands[params[0] as keyof typeof builtInCommands]))) as Partial<Record<Commands, boolean>>);

  const handleHistory = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowUp') {
      setHistoryIndex((prevState) => {
        const state = prevState > 1 ? prevState - 1 : 0;
        setUpdatedCommand(commands[state]);
        return state;
      });
    }
    if (e.key === 'ArrowDown') {
      setHistoryIndex((prevState) => {
        const state =
          prevState >= commands.length - 1
            ? commands.length - 1
            : prevState + 1;
        setUpdatedCommand(commands[state]);
        return state;
      });
    }
  };
  // endregion

  // region output
  const [outputs, setOutputs] = useState<
    Array<{ output: ReactNode; path: string }>
  >(startMessage ? [{ output: startMessage, path: FS.getHome() }] : []);
  // endregion

  // region paths
  const [homePath] = useState(FS.getHome());
  const [currentPath, setCurrentPath] = useState(FS.getHome());

  useEffect(() => {
    FS.import(fs);
  }, []);

  const cutHomePath = (path: string) => {
    if (path.slice(homePath.length).length > 0) {
      return '~/' + path.slice(homePath.length);
    } else {
      return '~';
    }
  };

  const cd = (newPath: string): string => {
    if (currentPath === '' && newPath.startsWith('../')) {
      return '';
    }
    try {
      if (newPath !== '') {
        setCurrentPath((prevState) =>
          FS._parsePath(prevState + '/' + newPath).join('/')
        );
      }
      return '';
    } catch (e) {
      return 'uncorrected path';
    }
  };

  const getPath = (path: string) => {
    return path.startsWith(homePath) ? cutHomePath(path) : path;
  };
  // endregion

  // region refs
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (divRef?.current !== undefined) {
      divRef!.current!.scrollTop = divRef?.current?.scrollHeight || 0;
    }
  };
  // endregion

  // region another
  const [device, setDevice] = useState<device>(
    useDeviceData(window.navigator.userAgent)
  );
  const [help] = useState<string>(generateHelp(filteredBuiltInCommands.current, applications));
  // endregion

  const closeApp = (output: ReactNode = '') => {
    setOutputs((prevState) => [...prevState, { output, path: currentPath }]);
    setCommand(undefined);
    setTimeout(() => inputRef?.current?.focus());
  };

  // region executor
  const finishExecute = (command: string) => {
    setCommands((prevState) => {
      setHistoryIndex(prevState.length + 1);
      return [...prevState, command];
    });
    setUpdatedCommand(undefined);
    setTimeout(() => scrollToBottom());
  };

  const execute = (command: string) => {
    if (command === '') {
      setOutputs((prevState) => [
        ...prevState,
        { output: '', path: currentPath },
      ]);
      finishExecute(command);
      return;
    }
    const deviceData = useDeviceData(window.navigator.userAgent);
    const commandArray = command.split(' ');
    const isApplication = Object.keys(applications).includes(
      commandArray[0].toLowerCase()
    );
    if (isApplication) {
      setCommand(command);
      setDevice(deviceData);
      finishExecute(command);
      return;
    }
    if (
      !isApplication &&
      !Object.keys(filteredBuiltInCommands.current).includes(commandArray[0].toLowerCase())
    ) {
      setOutputs((prevState) => [
        ...prevState,
        { output: 'command not found: ' + commandArray[0], path: currentPath },
      ]);
      finishExecute(command);
      return;
    } else {
      setDevice(deviceData);
      switch (
        Commands[commandArray[0].toLowerCase() as keyof typeof Commands]
      ) {
        case Commands.help:
          setOutputs((prevState) => [
            ...prevState,
            { output: help, path: currentPath },
          ]);
          break;
        case Commands.cd:
          const path = commandArray[1];
          if (!path) {
            setOutputs((prevState) => [
              ...prevState,
              { output: '', path: currentPath },
            ]);
            break;
          }
          const info = cd(path);
          setOutputs((prevState) => [
            ...prevState,
            { output: info, path: currentPath },
          ]);
          break;
        case Commands.ls:
          try {
            const data = FS.getFolder(
              currentPath +
                '/' +
                commandArray.slice(1, commandArray.length).join(' ')
            );
            const lsOutput: Array<string> = [];
            Object.keys(data).forEach((key) => {
              lsOutput.push(key);
            });
            setOutputs((prevState) => [
              ...prevState,
              { output: lsOutput.join('    '), path: currentPath },
            ]);
          } catch (e) {
            setOutputs((prevState) => [
              ...prevState,
              { output: 'uncorrected path', path: currentPath },
            ]);
          }
          break;
        case Commands.whoami:
          setOutputs((prevState) => [
            ...prevState,
            { output: user, path: currentPath },
          ]);
          break;
        case Commands.cat:
          const catOutput = FS.readFile(
            currentPath +
              '/' +
              commandArray.slice(1, commandArray.length).join(' ')
          );
          setOutputs((prevState) => [
            ...prevState,
            {
              output: catOutput,
              path: currentPath,
            },
          ]);
          break;
        case Commands.mkdir:
          FS.write(currentPath + '/' + commandArray[1], {});
          setOutputs((prevState) => [
            ...prevState,
            { output: '', path: currentPath },
          ]);
          break;
        case Commands.cp:
          const args = commandArray.slice(1).join(' ').split("'");
          const cpFile = FS.readFile(currentPath + '/' + args[1]);
          FS.write(args[3], cpFile);
          break;
        case Commands.echo:
          setOutputs((prevState) => [
            ...prevState,
            {
              output: commandArray.slice(1, commandArray.length).join(' '),
              path: currentPath,
            },
          ]);
          break;
        case Commands.rm:
          const recursion =
            commandArray.length === 3 && commandArray[1] === '-R';
          const rmPath =
            commandArray.length === 3 ? commandArray[2] : commandArray[1];
          const rmOutput = FS.remove(currentPath + '/' + rmPath, recursion);
          setOutputs((prevState) => [
            ...prevState,
            { output: rmOutput || '', path: currentPath },
          ]);
          break;
        case Commands.rev:
          setOutputs((prevState) => [
            ...prevState,
            {
              output: commandArray
                .slice(1, commandArray.length)
                .join(' ')
                .split('')
                .reverse()
                .join(''),
              path: currentPath,
            },
          ]);
          break;
        case Commands.clear:
          setCommands([]);
          setOutputs(
            startMessage ? [{ output: startMessage, path: currentPath }] : []
          );
          setHistoryIndex(0);
          return;
      }
    }
    finishExecute(command);
  };
  // endregion

  return (
    <div
      ref={divRef}
      className={styles.simulator}
      style={
        {
          borderTopLeftRadius: borderRadius?.topLeft
            ? borderRadius?.topLeft
            : 0,
          borderTopRightRadius: borderRadius?.topRight
            ? borderRadius?.topRight
            : 0,
          borderBottomLeftRadius: borderRadius?.bottomLeft
            ? borderRadius?.bottomLeft
            : 0,
          borderBottomRightRadius: borderRadius?.bottomRight
            ? borderRadius?.bottomRight
            : 0,
          '--simulatorBackground': theme.simulatorBackground,
          '--computerTextColor': theme.computerTextColor,
          '--atTextColor': theme.atTextColor,
          '--pathTextColor': theme.pathTextColor,
          '--outputTextColor': theme.outputTextColor,
          '--userTextColor': theme.userTextColor,
          '--commandTextColor': theme.commandTextColor,
        } as React.CSSProperties
      }
      onKeyDownCapture={handleHistory}
      onClick={() => {
        inputRef?.current?.focus();
      }}
    >
      <AppsProvider
        closeApp={closeApp}
        value={{ user, name, path: currentPath, device }}
        command={command}
        applications={applications}
      >
        <IO
          outputs={outputs}
          user={user}
          name={name}
          getPath={getPath}
          commands={commands}
          inputRef={inputRef}
          currentPath={currentPath}
          execute={execute}
          prompt={prompt}
          startMessage={startMessage}
          updatedCommand={updatedCommand}
          show={!!command}
        />
      </AppsProvider>
    </div>
  );
};

export default Simulator;
