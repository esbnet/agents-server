import { z } from 'zod'

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    HOST: z.string().default('*'),
    DATABASE_URL: z.string().url().startsWith('postgres://'),
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    GOOGLE_GENAI_API_KEY: z.string()
})

export const env = envSchema.parse(process.env)
