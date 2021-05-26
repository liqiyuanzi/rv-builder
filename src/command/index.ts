import { compileDir } from '../compiler';
import { SRC_DIR, DIST_DIR } from '../common/constant';
import { copySync, existsSync, remove } from '../common';
import chalk from 'chalk'

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

export function clean(): void {
    if( !existsSync( DIST_DIR ) ) return

    remove( DIST_DIR )
}

export function showHelp(): void {
    console.log(`
    ${chalk.green( 'yarn rvb --command') }
    ${chalk.red( 'e.g.') }
    build esmodule: ${chalk.blue( 'yarn rvb --esm or yarn rvb -e' )}
    build commonjs: ${chalk.blue( 'yarn rvb --cjs or yarn rvb -c' )}
    clean dist: ${chalk.blue( 'yarn rvb --clean or yarn rvb -cl' )}
    `);
}

export const support = {
    'esm' : buildEsm,
    'cjs' : buildCjs,
    'clean': clean,
    'help': showHelp
};