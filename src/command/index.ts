import { compileDir } from '../compiler';
import setAlias from '../alias';
import bundle from '../bundle';
import {
    DIST_DIR,
    getSrcDir,
    getDistDir
} from '../common/constant';
import { copySync, existsSync, removeSync, setEev } from '../common';
import chalk from 'chalk';
import watch from './watch';

export const buildSupport = {
    'esm' : buildEsm,
    'cjs' : buildCjs,
    'umd' : buildUmd
};

export const support = Object.assign( {
    'watch' : watch,
    'clean' : clean,
    'help' : showHelp
}, buildSupport );

async function build(): Promise<void> {
    copySync( getSrcDir(), getDistDir() );
    setAlias();
    return compileDir( getDistDir() );
}

export async function buildEsm(): Promise<void> {
    setEev( 'esm' );
    return build();
}

export async function buildCjs(): Promise<void> {
    setEev( 'cjs' );
    return build();
}

export async function buildUmd(): Promise<void> {
    setEev( 'umd' );
    return build().then( bundle );
}

export function clean(): void {
    const cleanList = Object.assign( buildSupport, {
        [ DIST_DIR ] : true
    } );
    for( const i in cleanList ) {
        if( existsSync( getDistDir( i ) ) ) {
            removeSync( getDistDir( i ) );
        }
    }
}

export function showHelp(): void {
    console.log( ` 
    ${chalk.green( 'yarn rvb --command' ) }
    ${chalk.red( 'e.g.' ) }
    build esmodule: ${chalk.blue( 'yarn rvb --esm or yarn rvb -e' )}
    build commonjs: ${chalk.blue( 'yarn rvb --cjs or yarn rvb -c' )}
    build umd: ${chalk.blue( 'yarn rvb --umd or yarn rvb -u' )}
    clean dist: ${chalk.blue( 'yarn rvb --clean or yarn rvb -cl' )}
    watch: ${chalk.blue( 'yarn rvb --watch or yarn rvb -w' )}
    ` );
}