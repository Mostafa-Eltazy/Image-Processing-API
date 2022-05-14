import express from 'express'
import { promises as fs } from 'fs'
import { resizer } from '../../util/resizer'

const imageRoute = express.Router()

imageRoute.get(
    '/',
    async (req: express.Request, res: express.Response): Promise<void> => {
        const properHeightValue =
            req.query.height &&
            Number(req.query.height) > 0 &&
            !Number.isNaN(Number(req.query.height))

        const properWidthValue =
            req.query.width &&
            Number(req.query.width) > 0 &&
            !Number.isNaN(Number(req.query.width))
        const completeData =
            req.query.name && properHeightValue && properWidthValue

        // if data is complete, acess the values from the url
        if (completeData) {
            const name = req.query.name as string
            const width = Number(req.query.width)
            const height = Number(req.query.height)
            try {
                // call the resizer function to accept data and output the result in the output directory
                await resizer(name, width, height)
                const inputFile = await fs.readFile(
                    `src/assets/thumb/${req.query.name}.jpg`
                )
                // return thumb image to the browser
                res.status(200).end(inputFile)
            } catch (err) {
                res.status(500).send('Something went wrong!')
            }
        } else res.status(400).send('Invalid user input')
    }
)

export default imageRoute