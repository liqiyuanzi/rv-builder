export default class Hook<T> {
    hooks: Record<string, Array<T>>;
    constructor() {
        this.hooks = {}
    }

    tap( key: string, fn: T ) {
        if( ! ( key in this.hooks ) ) {
            this.hooks[ key ] = []
        }

        const hooks = this.hooks[ key ];
        
        hooks.push( fn );
    }
}