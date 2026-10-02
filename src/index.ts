import { Hono } from 'hono'
import { R2Bucket } from '@cloudflare/workers-types'

type Bindings = {
  BUCKET: R2Bucket
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
