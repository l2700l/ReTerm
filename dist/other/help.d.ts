import { TermApp } from '../interfaces/TermApp';
import { Commands } from '../simulator/commands';
export declare const generateHelp: (builtInApplications: Partial<Record<Commands, boolean>>, applications: Record<string, TermApp>) => string;
