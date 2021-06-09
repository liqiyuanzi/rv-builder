import { compileDir } from '../compiler';
import {
    SRC_DIR,
    DIST_DIR,
    ESM_SRC_DIR,
    ESM_DIST_DIR,
    CJS_SRC_DIR,
    CJS_DIST_DIR,
    UMD_SRC_DIR,
    UMD_DIST_DIR,
    AMD_SRC_DIR,
    AMD_DIST_DIR
} from '../common/constant';
import { copySync, existsSync, removeSync } from '../common';
import chalk from 'chalk';
import watch from './watch';

const setEev = ( env: string ): void => {
    process.env.RF_BUILDER_ENV = env;
};

async function build( src = SRC_DIR, dist = DIST_DIR ): Promise<void> {
    copySync( src, dist );
    return compileDir( dist );
}

export async function buildEsm(): Promise<void> {
    setEev( 'esm' );
    return build( ESM_SRC_DIR, ESM_DIST_DIR );
}

export async function buildCjs(): Promise<void> {
    setEev( 'cjs' );
    return build( CJS_SRC_DIR, CJS_DIST_DIR );
}

export async function buildAmd(): Promise<void> {
    setEev( 'amd' );
    return build( AMD_SRC_DIR, AMD_DIST_DIR );
}

export async function buildUmd(): Promise<void> {
    setEev( 'umd' );
    return build( UMD_SRC_DIR, UMD_DIST_DIR );
}

export function clean(): void {
    if( existsSync( DIST_DIR ) ) {
        removeSync( DIST_DIR );
    }
    if( existsSync( AMD_DIST_DIR ) ) {
        removeSync( AMD_DIST_DIR );
    }
    if( existsSync( CJS_DIST_DIR ) ) {
        removeSync( CJS_DIST_DIR );
    }
    if( existsSync( UMD_DIST_DIR ) ) {
        removeSync( UMD_DIST_DIR );
    }
    if( existsSync( ESM_DIST_DIR ) ) {
        removeSync( ESM_DIST_DIR );
    }
}

export function showHelp(): void {
    console.log( ` 
    ${chalk.green( 'yarn rvb --command' ) }
    ${chalk.red( 'e.g.' ) }
    build esmodule: ${chalk.blue( 'yarn rvb --esm or yarn rvb -e' )}
    build commonjs: ${chalk.blue( 'yarn rvb --cjs or yarn rvb -c' )}
    build umd: ${chalk.blue( 'yarn rvb --umd or yarn rvb -u' )}
    build amd: ${chalk.blue( 'yarn rvb --amd or yarn rvb -a' )}
    clean dist: ${chalk.blue( 'yarn rvb --clean or yarn rvb -cl' )}
    ` );
}

export const buildSupport = {
    'esm' : buildEsm,
    'cjs' : buildCjs,
    'amd' : buildAmd,
    'umd' : buildUmd
};

export const support = Object.assign( {
    'watch' : watch,
    'clean' : clean,
    'help' : showHelp
}, buildSupport );