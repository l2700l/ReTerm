export declare class FS {
    private static tree;
    private static home;
    static getHome(): string;
    static setHome(home: string): string;
    /**
     * Removes '../' from the path, replacing with the parent directory
     * @param path
     * @private
     */
    static _parsePath(path: string): string[];
    static getFolder(path: string): Record<string, any>;
    private static _getFolderWithoutLast;
    static readFile(path: string): string | 'Uncorrected path';
    static write(path: string, data: string | {}): void;
    static remove(path: string, recursion?: boolean): "Requires the recursion flag" | undefined;
    static export(): string;
    static import(data: {
        [key: string]: any;
    } | string, home?: string): void;
}
