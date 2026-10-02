import { Hono } from 'hono'
import { R2Bucket } from '@cloudflare/workers-types'
import healthCheck from './routes/health'

type Bindings = {
  BUCKET: R2Bucket;
  MONGODB_URI: string;
  MONGODB_DB_NAME: string;
};

const app = new Hono<{ Bindings: Bindings }>()

app.get('/health', healthCheck)

export default app
