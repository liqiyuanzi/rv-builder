import { join } from 'path';
import compileVue from '../src/compiler/vue';
import { existsSync } from 'fs'

describe( 'compiler', () => {
    it( 'compiler.vue', async() => {
        const path = join( __dirname, './type/vue/test.vue' );
        
        await compileVue( path );
        expect( existsSync( join( __dirname, '../../dist_test/test/type/vue/test.js' ) ) ).toBe( true )
    } );
} );
