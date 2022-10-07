import routes from './routes/routes.js'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'


const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/', routes)

const port = 3001

app.listen(port, () => {
    console.log(`Listen on port ${port}`)
})