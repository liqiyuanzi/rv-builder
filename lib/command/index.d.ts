import watch from './watch';
export declare const getEev: () => string;
export declare function buildEsm(): Promise<void>;
export declare function buildCjs(): Promise<void>;
export declare function buildAmd(): Promise<void>;
export declare function buildUmd(): Promise<void>;
export declare function clean(): void;
export declare function showHelp(): void;
export declare const buildSupport: {
    esm: typeof buildEsm;
    cjs: typeof buildCjs;
    amd: typeof buildAmd;
    umd: typeof buildUmd;
};
export declare const support: {
    watch: typeof watch;
    clean: typeof clean;
    help: typeof showHelp;
} & {
    esm: typeof buildEsm;
    cjs: typeof buildCjs;
    amd: typeof buildAmd;
    umd: typeof buildUmd;
};
