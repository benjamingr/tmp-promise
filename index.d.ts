import { fileSync, dirSync, tmpNameSync, setGracefulCleanup } from 'tmp';
import { Options, SimpleOptions } from 'tmp';

export interface FileResult {
    name: string;
    fd: number;
    cleanup(): void;
}
export interface DirectoryResult {
    path: string;
    cleanup(): void;
}

export function file(options?: Options): Promise<FileResult>;
export function withFile<T>(fn: (result: FileResult) => Promise<T>): Promise<T>;

export function dir(options?: Options): Promise<DirectoryResult>;
export function withDir<T>(fn: (results: DirectoryResult) => Promise<T>): Promise<T>;

export function tmpName(options?: SimpleOptions): Promise<string>; 

export { fileSync, dirSync, tmpNameSync, setGracefulCleanup }