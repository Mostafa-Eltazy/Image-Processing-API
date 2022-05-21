import { resizer } from '../../util/resizer'
import { promises as fs } from 'fs'
import path from 'path'


const dir = path.join(__dirname, '../../assets/full')
const thumbDir = path.join(__dirname, '../../assets/thumb')

describe('Test image resizing', () => {
    const filename = 'cat'
    const width = 140
    const height = 200
    const expected = async function filePresnce() {
        await fs.readFile(`${thumbDir}/${filename}-thumb.jpg`)
    }

    it('Checks the output image file is present in assets/thumb', async () => {
        const outputFilePath = await resizer(filename, height, width)
        expect(expected).toBeDefined()
    })
})
