import React, { ReactNode } from 'react';
import styles from '../simulator/Simulator.module.scss';

const LineStart: React.FC<{
  user: string;
  name: string;
  path: string;
  prompt?: string;
  children?: ReactNode | undefined;
}> = ({ user, name, path, prompt = '$', children }) => {
  return (
    <span className={styles.simulator__line_padding}>
      <span className={styles.simulator__user}>{user}</span>
      <span className={styles.simulator__at}>@</span>
      <span className={styles.simulator__computer}>{name}</span>
      <span>:</span> <span className={styles.simulator__path}>{path}</span>{' '}
      <span>{prompt}</span>{' '}
      {children && (
        <span className={styles.simulator__command}>{children}</span>
      )}
    </span>
  );
};

export default React.memo(LineStart);
