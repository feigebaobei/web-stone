require('esbuild').build({
    entryPoints: ['src/index.js'],
    bundle: true,
    outdir: 'out',
    loader: {
        '.js': 'jsx',
        '.css': 'css',
    },
    // outfile: 'out.js',
}).catch(() => process.exit(1))