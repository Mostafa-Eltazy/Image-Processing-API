import express from 'express'
import { promises as fsPromises } from 'fs'
import fs from 'fs'
import path from 'path'
import { resizer } from '../../util/resizer'

const imageRoute = express.Router()

const dir = path.join(__dirname, '../../assets/full')
const thumbDir = path.join(__dirname, '../../assets/thumb')

imageRoute.get(
    '/',
    async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response | unknown> => {
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

        if (!properWidthValue) {
            return res.status(400).send('invalid Width!')
        }
        if (!properHeightValue) {
            return res.status(400).send('invalid Height!')
        }
        // if data is complete, acess the values from the url
        if (completeData) {
            const name = req.query.name as string
            const width = Number(req.query.width)
            const height = Number(req.query.height)

            //chech if the Tumb folder is present in the build, else create it
            if (!fs.existsSync(thumbDir)) {
                await fs.promises.mkdir(thumbDir)
            }
            // check if file is present in the thumb output directory
            try {
                const thumbImage = await fsPromises.readFile(
                    `${thumbDir}/${name}-thumb_${height}x${width}.jpg`
                )
                return res.status(200).end(thumbImage)
            } catch (err) {
                console.log(
                    'Image has not been resized before, resizing in progress'
                )
            }
            // call the resizer function to accept data and output the result in the output directory
            try {
                await resizer(name, width, height)
            } catch (err) {
                return res.status(500).send('Image failed to resize!')
            }
            // fetch the image from the thumbs directory to send to user
            try {
                const newThumbImg = await fsPromises.readFile(
                    `${thumbDir}/${name}-thumb_${height}x${width}.jpg`
                )
                return res.status(200).end(newThumbImg)
            } catch (err) {
                res.status(500).send('Something Went Wrong !!')
            }
        } else return res.status(400).send('Invalid user input')
    }
)

export default imageRoute
