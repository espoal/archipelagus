import { readFile } from 'node:fs/promises'
import { createSecureServer, createServer } from 'node:http2'
import { env } from 'node:process'

const isProd = env.NODE_ENV === 'production'
const port = Number(env.FRONT_PORT) || 8080

const server = isProd
  ? createServer()
  : createSecureServer({
    key: await readFile('localhost-privkey.pem'),
    cert: await readFile('localhost-cert.pem'),
  })

server.on('error', (err) => console.error(err))

server.on('stream', async (stream, headers) => {

  const path = headers[':path']

  console.log({ path, headers })

  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200,
  })
  stream.end('<h1>Hello worlp!!</h1>')
})

server.listen(port)
