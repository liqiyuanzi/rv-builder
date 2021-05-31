import watch from './watch';
export declare function buildEsm(): void;
export declare function buildCjs(): void;
export declare function buildAmd(): void;
export declare function buildUmd(): void;
export declare function clean(): void;
export declare function showHelp(): void;
export declare const support: {
    watch: typeof watch;
    esm: typeof buildEsm;
    cjs: typeof buildCjs;
    amd: typeof buildAmd;
    umd: typeof buildUmd;
    clean: typeof clean;
    help: typeof showHelp;
};
