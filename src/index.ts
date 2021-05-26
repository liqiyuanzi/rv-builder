#!/usr/bin/env node

import Commander from 'commander';
import { support } from './build'
import setAlias from './alias'

type Obj = { [ key in string ]: boolean }

const program = new Commander.Command();

const shouldBuildAll = ( obj: Obj ): boolean => {
    return Object.keys( obj ).length === 0
}

setAlias()

program
.option( '-e, --esm' )
.option( '-u, --umd' )
.option( '-c, --cjs' )
.action( ( options: Obj ) => {
    for( let type in support ) {
        (
             shouldBuildAll( options ) 
            || options[ type ] 
        ) 
        && support[ type as keyof typeof support ].call( null )
    }
} ).parse()