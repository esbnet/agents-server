import { fastifyCors } from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import { fastify } from 'fastify'
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { createQuestionRoute } from './http/routes/create-question.ts'
import { createRoomsRoute } from './http/routes/create-rooms.ts'
import { getRoomByIdRoute } from './http/routes/get-room-by-id.ts'
import { getRoomQuestionsRoute } from './http/routes/get-room-questions.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'
import { uploadAudioRoute } from './http/routes/upload-audio.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
    origin: 'http://localhost:5173'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.get('/health', () => {
    return 'OK'
})

app.register(fastifyMultipart)

app.register(createRoomsRoute)
app.register(getRoomsRoute)
app.register(getRoomByIdRoute)
app.register(getRoomQuestionsRoute)
app.register(createQuestionRoute)
app.register(uploadAudioRoute)

app.listen({ port: env.PORT, host: env.HOST }, () => {
    // biome-ignore lint/suspicious/noConsole: visual feedback only
    console.log(`✔ Server run in: http://localhost:${env.PORT} 🌐`)
})
