import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../env.ts'
import { schema } from './schema/index.ts'

export const sql = (() => {
    try {
        return postgres(env.DATABASE_URL)
    } catch (error) {
        throw new Error(`Database connection failed: ${error}`)
    }
})()

export const db = drizzle(sql, { schema, casing: 'snake_case' })

try {
    const result =
        await sql`SELECT '✔ Database connection established successfully! 🌐' as message`
    // biome-ignore lint/suspicious/noConsole: used only for dev
    console.log(result[0].message)
} catch (error) {
    throw new Error(`Database connection failed: ${error}`)
}
