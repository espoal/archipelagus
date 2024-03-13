import { buildHelper } from '@libs/build'

buildHelper({
    name: 'hello-service',
    entryPoints: ['svcs/hello/src/index.mts'],
    outDir: 'hello/src',
    external: ['mongodb'],
})
