import chokidar from 'chokidar';
import { compileDir, compileFile } from '../compiler';
import { SRC_DIR, DIST_DIR } from '../common/constant';
import { copySync, removeSync, dirname } from '../common';
import chalk from 'chalk';

const fileChange = ( path: string ): void => {
    const distPath = path.replace( SRC_DIR, DIST_DIR );
    copySync( path, distPath );
    compileFile( distPath );//eslint-disable-line
};

const addDir = ( path: string ): void => {
    copySync( path, DIST_DIR );
    compileDir( path );//eslint-disable-line
};

const removeFile = ( path: string ): void => {
    const distPath = dirname( path.replace( SRC_DIR, DIST_DIR ) );
    const srcPath = dirname( path );
    removeSync( distPath );
    copySync( srcPath, distPath );
    compileDir( distPath );//eslint-disable-line
};

export default function watch(): void {
    chokidar.watch( SRC_DIR, { ignoreInitial : true } ).on( 'all', ( eventName, path: string ) => {
        console.log( `${chalk.green( eventName )}: ${path}` );
        const eventHandlers = {
            'addDir' : addDir,
            'unlinkDir' : removeFile,
            'add' : fileChange,
            'change' : fileChange,
            'unlink' : removeFile
        };
        if( eventName in eventHandlers ) {
            eventHandlers[ eventName ].call( null, path );
        }
    } );
}