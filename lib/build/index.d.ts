export declare function buildEsm(): void;
export declare function buildCjs(): void;
export declare const support: {
    esm: typeof buildEsm;
    cjs: typeof buildCjs;
};
