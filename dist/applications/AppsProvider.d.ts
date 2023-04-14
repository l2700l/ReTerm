import React, { ReactNode } from 'react';
import { device, TermApp } from '../interfaces/TermApp';
declare const AppsProvider: React.FC<{
    closeApp: (output?: ReactNode) => void;
    children: ReactNode | undefined;
    value: {
        user: string;
        name: string;
        path: string;
        device: device;
    };
    command?: string;
    applications: Record<string, TermApp>;
}>;
export default AppsProvider;
