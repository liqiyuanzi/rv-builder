import { compileDir } from '../compiler';
import { SRC_DIR, DIST_DIR } from '../common/constant';
import { copySync } from '../common';

const setEev = ( env: string ): void => {
    process.env.RF_BUILDER_ENV = env;
};

function build(): void {
    copySync( SRC_DIR, DIST_DIR );
    compileDir( DIST_DIR );// eslint-disable-line
}

export function buildEsm(): void {
    setEev( 'esm' );
    build();
}

export function buildCjs(): void {
    setEev( 'cjs' );
    build();
}

export const support = {
    'esm' : buildEsm,
    'cjs' : buildCjs
};