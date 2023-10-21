import esbuild from 'esbuild'

await esbuild.build({
  bundle: true,
  entryPoints: [
    './src/index.ts',
  ],
  outdir: './dist',
  platform: 'node',
  format: 'cjs',
})
