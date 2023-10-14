import {createServer} from 'http'
import {Server} from 'socket.io'
import express from 'express'
import path from 'path'

const PORT = process.env.PORT || 3500
const app = express()

const httpServer = createServer(app)

const socketServer = new Server(httpServer,{
    cors:{
        origin:process.env.NODE == 'production' ? false : ['http://localhost:5500','http://127.0.0.1:5500','https://good-lemur-causal.ngrok-free.app','https://good-lemur-causal.ngrok-free.app/app/']
    }
})

app.use(express.static('public'))
