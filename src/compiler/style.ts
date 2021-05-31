import { parse } from 'path';
import compileLess from './less';
import { replaceExt, writeFileSync } from '../common';

const compilersMaps = {
    '.less' : compileLess
};

async function compileFile( filePath: string ): Promise<string> {
    const parsedPath = parse( filePath );
    const { ext } = parsedPath;

    if( ext in compilersMaps ) {
        const result = await compilersMaps[ ext as keyof typeof compilersMaps ].call( null, filePath );
        return result;
    }

    return '';
}

export default async function compileStyle( filePath: string ): Promise<void> {
    const css = await compileFile( filePath );

    writeFileSync( replaceExt( filePath, '.css' ), css );
}
