module.exports = {
    src : 'demo',
    dist : 'dist_demo',
    umd : {
        entry : './[dist]/entry.js',
        dist : 'dist_umd_demo',
        name : 'test',
        minify : true
    },
    cjs : {
        dist : 'dist_cjs_demo',
    },
    esm : {
        dist : 'dist_esm_demo',
    },
    alias : {
        'test____str' : '"ccccccc"'
    }
};