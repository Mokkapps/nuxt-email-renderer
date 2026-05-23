import type { H3Event } from 'h3'
import { readBody } from 'h3'

export async function readJsonBody<T = unknown>(event: H3Event): Promise<T> {
  if (typeof event.req?.text === 'function') {
    return await readBody(event) as T
  }

  const req = event.node?.req
  if (!req) {
    throw new Error('Unable to read request body')
  }

  const raw = await new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', chunk => chunks.push(Buffer.from(chunk)))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })

  return (raw ? JSON.parse(raw) : undefined) as T
}
