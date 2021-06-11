import { transform } from '@babel/core';
import { readFileSync, writeFileSync, replaceExt, removeSync, translateStyleImports, translateJsImports } from '../common';

export default async function( filepath: string ): Promise<void> {
    let code = readFileSync( filepath, 'utf8' );

    code = translateStyleImports( code );
    code = translateJsImports( code );
    const result = transform( code, {
        filename : filepath
    } )?.code;
    if( !result ) return;

    removeSync( filepath );
    writeFileSync( replaceExt( filepath, '.js' ), result );
    return Promise.resolve();
}