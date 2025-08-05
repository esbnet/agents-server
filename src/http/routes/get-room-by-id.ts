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
                    roomId: z.string()
                })
            }
        },
        async (request, reply) => {
            try {
                const { roomId } = request.params
                const room = await db.select().from(schema.rooms).where(eq(rooms.id, roomId))
                
                if (room.length === 0) {
                    return reply.status(404).send({ error: 'Room not found' })
                }
                
                return room[0]
            } catch (error) {
                return reply.status(500).send({ error: 'Failed to fetch room' })
            }
        }
    )
}
