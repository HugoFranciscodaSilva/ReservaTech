import express from 'express'
import UserRoutes from './routes/UserRoute.js'
import ItemRoutes from './routes/ItemRoute.js'
import 'dotenv/config'

const PORTA = process.env.PORTA
const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Api rodando!")
})

app.use('/users',UserRoutes)
app.use('/items',ItemRoutes)

app.listen(PORTA,()=>{
    console.log(`Servidor rodando em: http://localhost:${PORTA}`)
})