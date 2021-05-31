import { compileDir } from '../compiler';
import { SRC_DIR, DIST_DIR } from '../common/constant';
import { copySync, existsSync, remove } from '../common';
import chalk from 'chalk';
import watch from './watch';

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

export function buildAmd(): void {
    setEev( 'amd' );
    build();
}

export function buildUmd(): void {
    setEev( 'umd' );
    build();
}

export function clean(): void {
    if( !existsSync( DIST_DIR ) ) return;

    remove( DIST_DIR )// eslint-disable-line
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

export const support = {
    'watch' : watch,
    'esm' : buildEsm,
    'cjs' : buildCjs,
    'amd' : buildAmd,
    'umd' : buildUmd,
    'clean' : clean,
    'help' : showHelp
};