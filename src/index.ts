#!/usr/bin/env node

import Commander from 'commander';
import { support } from './command';
import setAlias from './alias';

type Obj = { [ key in string ]: boolean };

const program = new Commander.Command();

const shouldBuildAll = ( obj: Obj ): boolean => {
    return Object.keys( obj ).length === 0;
};

setAlias();

program
    .option( '-w, --watch' )
    .option( '-e, --esm' )
    .option( '-a, --amd' )
    .option( '-u, --umd' )
    .option( '-c, --cjs' )
    .option( '-cl, --clean' )
    .option( '-h, --help' )
    .action( ( options: Obj ) => {
        for( const type in support ) {
            ( shouldBuildAll( options ) || options[ type ] ) && support[ type as keyof typeof support ].call( null );
        }
    } ).parse();