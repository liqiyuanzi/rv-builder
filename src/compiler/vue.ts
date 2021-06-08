import { parse, compileTemplate, SFCDescriptor, SFCBlock, compileStyle } from '@vue/component-compiler-utils';
import { VueTemplateCompiler } from '@vue/component-compiler-utils/lib/types';
import * as templateCompiler from 'vue-template-compiler';
import { readFileSync, hash, replaceExt, writeFileSync, parse as parsePath, replace, remove } from '../common';
import { RENDER_FN, STATIC_RENDER_FN } from '../common/constant';
import compileJs from './js';
import compileStyles from './style';

type SFCDescriptorOutput = SFCDescriptor & { source: string };

const hasScoped = ( styles: SFCBlock[] ): boolean => {
    return !!styles.find( item => item.scoped );
};

const createScopedId = ( str: string ): string => {
    return 'data-v-' + hash( str );
};

const getVueStylePath = ( filePath: string, ext: string, index: number ): string => {
    return replaceExt( filePath, `-rbv-vue${index || ''}.${ext}` );
};

function parseVue( filepath: string ): SFCDescriptorOutput {
    const source = readFileSync( filepath, 'utf-8' );

    return Object.assign( parse( {
        source,
        needMap : false,
        compiler : templateCompiler as VueTemplateCompiler
    } ), {
        source
    } );
}

function parseTemplate( source: string, filename = '' ): string {
    return compileTemplate( {
        source,
        filename,
        isProduction : true,
        compiler : templateCompiler as VueTemplateCompiler
    } ).code;
}

function injectCss( script: string, filepath: string, len = 0 ): string {
    if( len < 1 ) return script;

    const imports: string[] = [];
    for( let i = 0; i < len; i++ ) {
        const { base } = parsePath( getVueStylePath( filepath, 'css', i ) );
        imports.push( `import './${ base }';` );
    }
    imports.join( '\n' );

    return replace( script, source => `${imports}\n\n${ source }` );
}

function injectScopeId( script: string, scopeId: string ): string {
    return replace( script, source => `${source}\n  _scopeId: '${scopeId}',\n` );
}

function injectTemplate( script: string, template: string ): string {
    template = template
        .replace( 'var render', `var ${RENDER_FN}` )
        .replace( 'var staticRenderFns', `var ${STATIC_RENDER_FN}` );

    return replace( script, source => `${template}\n${source}\n  render: ${RENDER_FN},\n\n  staticRenderFns: ${STATIC_RENDER_FN},\n` );
}

export default async function( filepath: string ): Promise<void> {
    const tasks: Promise<void>[] = [];
    const { script : content, styles, template, source } = parseVue( filepath );
    const scopeId = hasScoped( styles ) ? createScopedId( source ) : '';
    let script = content?.content;

    tasks.push(
        new Promise( ( resolve ) => {
            if( !script ) { resolve(); return }

            const jsPath = replaceExt( filepath, '.js' );

            if( template?.content ) {
                script = injectTemplate( script, parseTemplate( template.content ) );
            }

            if( styles.length ) {
                script = injectCss( script, filepath, styles.length );
            }

            if( scopeId ) {
                script = injectScopeId( script, scopeId );
            }

            writeFileSync( jsPath, script );
            compileJs( jsPath ).then( resolve );//eslint-disable-line
        } )
    );

    styles.forEach( ( style, index: number ) => {
        tasks.push(
            new Promise( ( resolve ) => {
                let { content : source, scoped, lang } = style; //eslint-disable-line
                const cssPath = getVueStylePath( filepath, lang ?? 'css', index );
                if( scoped ) {
                    source = compileStyle( {
                        id : scopeId,
                        scoped : true,
                        trim : true,
                        source,
                        filename : cssPath
                    } ).code;
                }
                writeFileSync( cssPath, source );
                compileStyles( cssPath ).then( resolve );//eslint-disable-line
            } )
        );
    } );

    tasks.push( remove( filepath ) );

    Promise.all( tasks );//eslint-disable-line
}