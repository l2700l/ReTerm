import React, { ReactNode } from 'react';
import Output from '../lines/Output';
import styles from './Simulator.module.scss';
import Input from '../lines/Input';

export type IOProps = {
  outputs: { output: ReactNode; path: string }[];
  user: string;
  name: string;
  getPath(path: string): string;
  startMessage?: string;
  commands: string[];
  inputRef: React.RefObject<HTMLInputElement>;
  currentPath: string;
  execute: (command: string) => void;
  updatedCommand?: string;
  prompt: string;
  show?: boolean;
};

const IO: React.FC<IOProps> = ({
  outputs,
  user,
  name,
  getPath,
  startMessage,
  commands,
  currentPath,
  updatedCommand,
  execute,
  prompt,
  inputRef,
  show,
}) => {
  return (
    <div hidden={show}>
      {outputs.map((output, index) => (
        <Output
          key={index}
          user={user}
          name={name}
          path={getPath(output.path)}
          lineStart={!startMessage || index !== 0}
          command={startMessage ? commands[index - 1] : commands[index]}
          prompt={prompt}
        >
          {output.output}
        </Output>
      ))}
      <div className={styles.simulator__input}>
        <Input
          user={user}
          name={name}
          ref={inputRef}
          path={getPath(currentPath)}
          execute={execute}
          updatedCommand={updatedCommand}
          prompt={prompt}
        />
      </div>
    </div>
  );
};

export default IO;
