import React, { useEffect, useState } from 'react';
import LineStart from './LineStart';
import styles from '../simulator/Simulator.module.scss';

type props = {
  user: string;
  name: string;
  path: string;
  execute: (command: string) => void;
  updatedCommand?: string;
  prompt?: string;
};

const Input: React.FC<props> = React.forwardRef<HTMLInputElement, props>(
  ({ user, name, path, updatedCommand, execute, prompt }, ref) => {
    const [command, setCommand] = useState('');
    useEffect(() => {
      if (updatedCommand) {
        setCommand(updatedCommand);
      }
    }, [updatedCommand]);
    const handleExecute = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter') {
        execute(command);
        setCommand('');
        // @ts-ignore
        ref.current.focus();
      }
    };
    return (
      <>
        <LineStart user={user} name={name} path={path} prompt={prompt} />
        <input
          ref={ref}
          className={styles.simulator__command}
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleExecute}
        />
      </>
    );
  }
);

export default Input as React.FC<
  props & { ref?: React.RefObject<HTMLInputElement> }
>;
