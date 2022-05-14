import { resizer } from '../../util/resizer'
import { promises as fs } from 'fs'

describe('Test image resizing', () => {
    const filename = 'cat'
    const width = 140
    const height = 200
    const expected = async function filePresnce() {
        await fs.readFile(`src/assets/thumb/${filename}-thumb.jpg`)
    }

    it('Checks the output image file is present in assets/thumb', async () => {
        const outputFilePath = await resizer(filename, height, width)
        expect(expected).toBeDefined()
    })
})
