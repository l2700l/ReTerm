import React, { ReactNode } from 'react';
import LineStart from './LineStart';
import styles from '../simulator/Simulator.module.css';

const Output: React.FC<{
  user: string;
  name: string;
  path: string;
  lineStart?: boolean;
  command?: string;
  prompt?: string;
  children?: ReactNode | undefined;
}> = ({ user, name, path, command, prompt, children, lineStart = true }) => {
  return (
    <>
      {lineStart && (
        <LineStart user={user} name={name} path={path} prompt={prompt}>
          {command}
        </LineStart>
      )}
      <span className={styles.simulator__line}>{children}</span>
    </>
  );
};

export default React.memo(Output);
