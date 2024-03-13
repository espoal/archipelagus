import process, { argv } from 'node:process'
import esbuild from 'esbuild'
import { writeFile } from 'node:fs/promises'
import { glob } from 'glob'
import { defaultOptions } from './defaultOptions.mjs'
import { buildLoggerPlugin } from "./logger.mjs"

const isProd = process.env.NODE_ENV === 'production' || argv.includes('prod')
const shouldWatch = argv.includes('--watch')
const envType = isProd ? 'prod' : 'dev'
const buildType = shouldWatch ? 'watch' : 'build'

export const buildHelper = async ({
  name,
  entryPoints = ['No entrypoint specified'],
  entryNames = undefined,
  patterns = [],
  external = [],
  plugins = [],
  outDir = '',
  alias = {},
}) => {
  const options = {
    ...defaultOptions,
    entryPoints,
    entryNames,
    external,
    alias,
    plugins: [buildLoggerPlugin(name), ...plugins],
    outdir: `dist/${outDir}`,
  }
  console.log(`Starting ${buildType} in ${envType} for: ${name}`)

  if (patterns.length > 0) {
    const resolvedPatterns = []
    for (const pattern of patterns) {
      resolvedPatterns.push(...(await glob(pattern)))
    }
    options.entryPoints = resolvedPatterns
  }

  if (shouldWatch) {
    const ctx = await esbuild.context(options)
    await ctx.watch()
  } else {
    const result = await esbuild.build(options)
    await writeFile(`dist/meta/meta-${name}.json`, JSON.stringify(result.metafile, null, 2))
  }
}
