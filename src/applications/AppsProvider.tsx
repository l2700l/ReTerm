import React, { ReactNode } from 'react';
import { device, TermApp } from '../interfaces/TermApp';

const AppsProvider: React.FC<{
  closeApp: (output?: ReactNode) => void;
  children: ReactNode | undefined;
  value: { user: string; name: string; path: string; device: device };
  command?: string;
  applications: Record<string, TermApp>;
}> = ({ children, closeApp, value, command, applications }) => {
  const switchApp = () => {
    if (command === undefined) return children;
    return applications[command.split(' ')[0]].execute(
      command || '',
      closeApp,
      value
    );
  };
  return <>{switchApp()}</>;
};

export default AppsProvider;
