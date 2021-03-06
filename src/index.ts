#!/usr/bin/env node

import Commander from 'commander';
import { support, buildSupport } from './command';

type Obj = { [ key in string ]: boolean };

const program = new Commander.Command();

const shouldBuildAll = ( obj: Obj ): boolean => {
    return Object.keys( obj ).length === 0;
};

program
    .option( '-w, --watch' )
    .option( '-e, --esm' )
    .option( '-a, --amd' )
    .option( '-u, --umd' )
    .option( '-c, --cjs' )
    .option( '-cl, --clean' )
    .option( '-h, --help' )
    .action( async ( options: Obj ) => {
        const supports = shouldBuildAll( options ) ? buildSupport : options;
        for( const type in supports ) {
            await support[ type as keyof typeof supports ].call( null );//eslint-disable-line
        }
    } ).parse();