import { count, eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
    app.get('/rooms', async () => {
        return await db
            .select({
                id: schema.rooms.id,
                name: schema.rooms.name,
                questionCount: count(schema.questions.id),
                createdAt: schema.rooms.createdAt
            })
            .from(schema.rooms)
            .leftJoin(
                schema.questions,
                eq(schema.rooms.id, schema.questions.roomId)
            )
            .groupBy(schema.rooms.id, schema.rooms.name)
            .orderBy(schema.rooms.createdAt)
    })
}
