import express from 'express'
import request from 'request'


const router = express.Router()

router.get('/:id', (req, res) => {
    const cep = req.params.id
    request(`https://viacep.com.br/ws/${cep}/json/`, (err, response, body) => {
        if (response.statusCode === 400 || response.body.erro === true){
            res.send({message: 'address not found'})
         } else {
            res.send(response.body)
        }
    })
})

router.get('/', (req, res) => {
    res.send('funciona')
})

export default router