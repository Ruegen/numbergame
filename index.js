const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.post('/api/game', (req, res) => {

    const randomNumber = Math.floor(
        (Math.random() * 100)
    ).toString()

    if(randomNumber > req.body.number) {
        res.status(200).json({
            choice: req.body.number,
            actual: randomNumber,
            result: 'won'
        })
    } else {
        res.status(200).json({
            choice: req.body.number || 0,
            actual: randomNumber,
            result: 'lost'
        })
    }
})

app.listen(3000, () => {
    console.info('listening on port 3000')
})