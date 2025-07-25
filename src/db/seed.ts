import { reset, seed } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'

await reset(db, schema)

await seed(db, schema).refine((f) => {
    return {
        rooms: {
            count: 10,
            columns: {
                name: f.companyName(),
                description: f.loremIpsum()
            },
            with: {
                questions: 5
            }
        }
    }
})

sql.end()

// biome-ignore lint/suspicious/noConsole: used only for dev
console.log('Database seeded successfully 🌱')
