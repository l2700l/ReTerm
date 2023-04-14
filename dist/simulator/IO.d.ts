import React, { ReactNode } from 'react';
export type IOProps = {
    outputs: {
        output: ReactNode;
        path: string;
    }[];
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
declare const IO: React.FC<IOProps>;
export default IO;
