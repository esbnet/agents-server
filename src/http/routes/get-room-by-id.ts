import { eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'
import { rooms } from '../../db/schema/rooms.ts'

export const getRoomByIdRoute: FastifyPluginCallbackZod = (app) => {
    app.get(
        '/room/:roomId',
        {
            schema: {
                params: z.object({
                    id: z.string()
                })
            }
        },
        async (request) => {
            const { id } = request.params

            return await db.select().from(schema.rooms).where(eq(rooms.id, id))
        }
    )
}
