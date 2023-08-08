import React from 'react';
import { TermApp } from '../../../interfaces/TermApp';
import Sl from './Sl';

export const sl: TermApp = {
  help: {
    template: '*secret*',
    description: 'do not make mistakes in commands!',
  },
  execute: (_, closeApp) => {
    return <Sl closeApp={closeApp} />;
  },
};
