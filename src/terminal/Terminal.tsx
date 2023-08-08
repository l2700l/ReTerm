import React, { useEffect, useState } from 'react';
import styles from "./Terminal.module.scss";
import Simulator from '../simulator/Simulator';
import { SimulatorProps } from '../interfaces/Simulator';
import Buttons from './Buttons';
const Terminal: React.FC<SimulatorProps> = ({
  user,
  name,
  prompt,
  startMessage,
  theme,
  fs,
  applications,
  builtInCommands
}) => {
  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>(
    window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
  );
  
  const handleResize = () => {
    if (window.innerWidth > window.innerHeight) {
      setOrientation('landscape');
    } else {
      setOrientation('portrait');
    }
  };
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <>
      {orientation === 'landscape' ? (
        <div className={styles.terminal}>
          <div className={styles.terminal__top}>
            <Buttons />
            <div className={styles.terminal__header}>
              {user}@{name}
            </div>
          </div>
          <Simulator
            name={name}
            user={user}
            prompt={prompt}
            borderRadius={{ bottomLeft: '0.5rem', bottomRight: '0.5rem' }}
            startMessage={startMessage}
            theme={theme}
            fs={fs}
            applications={applications}
            builtInCommands={builtInCommands}
          />
        </div>
      ) : (
        <h2 style={{ textAlign: 'center' }}>
          Use <i>landscape</i> orientation!
        </h2>
      )}
    </>
  );
};

export default Terminal;
