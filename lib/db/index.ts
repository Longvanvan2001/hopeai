import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Better Auth's tables (`user`, `session`, `account`, `verification`) were
// provisioned into the `neon_auth` schema, not `public`. Neon's pooled
// connection rejects a `search_path` startup option, so set it per connection
// instead — this runs once for each new pooled connection.
pool.on('connect', (client) => {
  client.query('SET search_path TO neon_auth, public')
})

export const db = drizzle(pool, { schema })
