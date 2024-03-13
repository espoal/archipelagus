export const defaultOptions = {
  plugins: [],
  bundle: true,
  splitting: true,
  format: 'esm',
  platform: 'node',
  target: 'esnext',
  treeShaking: true,
  outExtension: { '.js': '.mjs' },
  metafile: true,
}
