import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:id/questions',
    {
      schema: {
        params: z.object({
          id: z.string()
        }),
        body: z.object({
          question: z.string().min(3),
          answer: z.string().optional()
        })
      }
    },
    async (request, reply) => {
      const { id } = request.params as { id: string }
      const { question } = request.body

      const result = await db
        .insert(schema.questions)
        .values({ question, roomId: id, answer: null })
        .returning({
          id: schema.questions.id
        })

      return reply.status(201).send({
        id: result[0].id
      })
    }
  )
}
