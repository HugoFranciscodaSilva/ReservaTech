import express from 'express'
import UserRoutes from './routes/UserRoute.js'
import ItemRoutes from './routes/ItemRoute.js'
import ReserveRoutes from './routes/ReserveRoute.js'
import cors from 'cors'
import 'dotenv/config'

const PORTA = process.env.PORTA
const app = express()
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("Api rodando!")
})

app.use('/users',UserRoutes)
app.use('/items',ItemRoutes)
app.use('/reserves',ReserveRoutes)

app.listen(PORTA,()=>{
    console.log(`Servidor rodando em: http://localhost:${PORTA}`)
})