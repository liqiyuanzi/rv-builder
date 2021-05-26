import { join } from 'path';
import { existsSync } from 'fs';
import compileJs from '../src/compiler/js';

describe( 'compiler', () => {
    it( 'compiler.react', async() => {
        const path = join( __dirname, './type/react/test.tsx' );
        
        await compileJs( path );
        const distPath = join( __dirname, '../../dist_test/test/type/react/test.js' );
        expect( existsSync( distPath ) ).toBe( true )
    } );
} );
