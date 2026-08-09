import express from 'express'
import 'dotenv/config'

const PORTA = process.env.PORTA
const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Api rodando!")
})

app.listen(PORTA,()=>{
    console.log(`Servidor rodando em: http://localhost:${PORTA}`)
})