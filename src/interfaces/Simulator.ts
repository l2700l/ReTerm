import { TermApp } from './TermApp';
import { Commands } from '../simulator/commands';

export type SimulatorProps = {
  user?: string;
  name?: string;
  borderRadius?: {
    topLeft?: string;
    topRight?: string;
    bottomLeft?: string;
    bottomRight?: string;
  };
  startMessage?: string;
  prompt?: string;
  theme?: {
    simulatorBackground?: string;
    computerTextColor?: string;
    atTextColor?: string;
    pathTextColor?: string;
    outputTextColor?: string;
    userTextColor?: string;
    commandTextColor?: string;
  };
  fs?: Record<string, any>;
  applications?: Record<string, TermApp>;
  builtInCommands?: Partial<Record<Commands, boolean>>;
};
