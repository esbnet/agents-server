import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'
import { generateEmbeddings, transcribeAudio } from '../../service/gemini.ts'

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
    app.post(
        '/rooms/:roomId/audio',
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
                const audio = await request.file()

                if (!audio) {
                    return reply.status(400).send({ error: 'Audio file is required' })
                }

                // Validate audio file type
                const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/mp4', 'audio/webm']
                if (!allowedTypes.includes(audio.mimetype)) {
                    return reply.status(400).send({ error: 'Invalid audio format' })
                }

                // Validate file size (max 10MB)
                const maxSize = 10 * 1024 * 1024
                if (audio.file.bytesRead > maxSize) {
                    return reply.status(400).send({ error: 'File too large' })
                }

                const audioBuffer = await audio.toBuffer()
                const audioAsBase64 = audioBuffer.toString('base64')
                const transcription = await transcribeAudio(
                    audioAsBase64,
                    audio.mimetype
                )
                const embeddings = (await generateEmbeddings(transcription)) ?? []
                
                const result = await db
                    .insert(schema.audioChunks)
                    .values({
                        roomId,
                        transcription,
                        embeddings
                    })
                    .returning({
                        chunksId: schema.audioChunks.id
                    })
                
                const audioChunkId = result[0]?.chunksId
                if (!audioChunkId) {
                    return reply.status(500).send({ error: 'Failed to save audio chunk' })
                }

                return reply.status(201).send({
                    chunkId: audioChunkId
                })
            } catch (error) {
                return reply.status(500).send({ error: 'Failed to process audio' })
            }
        }
    )
}
