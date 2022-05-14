import express from 'express'
import routes from '../src/routes/index'

const app = express()
const port = 3000

app.use('/', routes)

app.listen(port, () => {
    console.log(`Now listening on port ${port}`)
})

export const myFunc = (x: number): number => {
    return x * x
}

// module.exports = {myFunc}
