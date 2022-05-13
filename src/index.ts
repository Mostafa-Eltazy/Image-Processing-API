import express from 'express';

const app = express()
const port = 3000

app.get('/', (req :express.Request, res :express.Response) :void => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`)
})

export const myFunc = (x:number):number =>{
    return x*x;
}

// module.exports = {myFunc}
