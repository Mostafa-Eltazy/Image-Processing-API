import { resizer } from '../../util/resizer'
import { promises as fs } from 'fs'
import sharp from 'sharp'
import path from 'path'

const dir = path.join(__dirname, '../../assets/full')
const thumbDir = path.join(__dirname, '../../assets/thumb')

console.log(dir, thumbDir)
describe('Test image resizing', () => {
    const filename = 'cat'
    const width = 140
    const height = 200
    const filePath = `${thumbDir}/${filename}-thumb_${height}x${width}.jpg`
    beforeEach(async () => {
        try {
            await fs.unlink(filePath)
        } catch (e) {}
    })
    const expectedFile = async function filePresnce() {
        try {
            const file = await fs.readFile(filePath)
            return file
        } catch (e) {
            return undefined
        }
    }

    // it chechks the presence of the output file in the assets/thumb indicationg that the resizer worked
    it('Checks the output image file is present in assets/thumb', async () => {
        await resizer(filename, width, height)
        const file = await expectedFile()
        expect(file).toBeDefined()
    })

    it('Checks the actual height and width of the thumb image to be equalt to values sent in the request', async () => {
        await resizer(filename, width, height)
        const file = await sharp(filePath)
        const metadata = await file.metadata()
        const expectedWidth = metadata.width
        const expectedHeight = metadata.height
        expect(expectedWidth).toEqual(width)
        expect(expectedHeight).toEqual(height)
    })
})
