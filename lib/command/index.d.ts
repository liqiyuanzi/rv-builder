export declare function buildEsm(): void;
export declare function buildCjs(): void;
export declare function clean(): void;
export declare function showHelp(): void;
export declare const support: {
    esm: typeof buildEsm;
    cjs: typeof buildCjs;
    clean: typeof clean;
    help: typeof showHelp;
};
