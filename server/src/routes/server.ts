import 'dotnev/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import {memoriesRoutes} from './routes/memories'
import {authRoutes} from './routes/auth'
import * as upload from './routes/upload'
import {resolve} from 'path'

const app = fastify()

app.register(multipart)

app.register(require('@fastify/static'),{
    root: resolve(_dirname, '../uploads'),
    prefix: '/uploads/',
})

app.register(cors,{
    origin: true,
})

app.register(jwt,{
    secret: 'spacetime',
})

app.register(authRoutes)
app.register(upload.uploadRoutes)
app.register(memoriesRoutes)

app
    .listen({
        port: 3333,
        host: '0.0.0.0',
    })
    .then(()=>{
        console.log(' HTTP server running on http://localhost:3333')
    })