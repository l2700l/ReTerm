import { ReactNode } from 'react';
export type AppOutput = ReactNode | void;
export type closeApp = (output?: ReactNode) => void;
export type device = {
    UA: {
        getBrowser: () => any;
        getCPU: () => any;
        getDevice: () => any;
        getEngine: () => any;
        getOS: () => any;
        getResult: () => any;
        getUA: () => any;
        setUA: (ua2: any) => any;
    };
    browser: {
        name?: string;
        version?: string;
        major?: string;
    };
    cpu: {
        architecture?: string;
    };
    device: {
        vendor?: string;
        model?: string;
    };
    engine: {
        name?: string;
        version?: string;
    };
    os: {
        name?: string;
        version?: string;
    };
    ua: string;
};
export interface IAppExecutor {
    (command: string, closeApp: closeApp, value: {
        user: string;
        name: string;
        path: string;
        device: device;
    }): AppOutput;
}
export interface TermApp {
    help?: {
        template?: string;
        description?: string;
    };
    execute: IAppExecutor;
}
export type TermAppComponent = {
    command?: string;
    closeApp: closeApp;
    value?: {
        user: string;
        name: string;
        path: string;
        device: device;
    };
};
