import express from 'express'
import imageRoute from './api/imageRoute'
const routes = express.Router()

routes.get('/', (req: express.Request, res: express.Response): void => {
    res.send('main api route')
})

routes.use('/images', imageRoute)

export default routes
