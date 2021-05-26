import { transform } from '@babel/core';
import { readFileSync, parse, writeFileSync, replaceExt, removeSync, translateStyleImports, translateJsImports } from '../common';

export default async function( filepath: string ): Promise<void> {
    const { base } = parse( filepath );

    const code = readFileSync( filepath, 'utf8' );

    let result = transform( code, {
        filename : base
    } )?.code;
    if( !result ) return;

    result = translateStyleImports( result );
    result = translateJsImports( result );

    removeSync( filepath );
    writeFileSync( replaceExt( filepath, '.js' ), result );
}