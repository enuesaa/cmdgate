import esbuild from 'esbuild'

await esbuild.build({
  bundle: true,
  entryPoints: [
    './src/cli.ts',
  ],
  outdir: './dist',
  platform: 'node',
  format: 'esm',
})
