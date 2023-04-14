import React from 'react';
type props = {
    user: string;
    name: string;
    path: string;
    execute: (command: string) => void;
    updatedCommand?: string;
    prompt?: string;
};
declare const _default: React.FC<props & {
    ref?: React.RefObject<HTMLInputElement> | undefined;
}>;
export default _default;
