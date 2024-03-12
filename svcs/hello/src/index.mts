import { readFile } from 'node:fs/promises'
import { createSecureServer, createServer } from 'node:http2'
import { env } from 'node:process'

const isProd = env.NODE_ENV === 'production'
const port = Number(env.ETL_PORT) || 8443

const server = isProd
  ? createServer()
  : createSecureServer({
      key: await readFile('localhost-privkey.pem'),
      cert: await readFile('localhost-cert.pem'),
    })

server.on('error', (err) => console.error(err))

server.on('stream', async (stream, headers) => {
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200,
  })
  stream.end('<h1>Hello worlder!!</h1>')
})

server.listen(port)
