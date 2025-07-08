import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../env.ts'
import { schema } from './schema/index.ts'

export const sql = postgres(env.DATABASE_URL)
export const db = drizzle(sql, { schema, logger: true, casing: 'snake_case' })

const result =
  await sql`SELECT '🌐 Database connection established successfully 🌐' as message`

// biome-ignore lint/suspicious/noConsole: used only for dev
console.log(result[0].message)
