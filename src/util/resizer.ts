import sharp from 'sharp'
import path from 'path'

const dir = path.join(__dirname, '../../src/assets/full')

//thumbnail directory
const thumbDir = path.join(__dirname, '../../src/assets/thumb')

async function resizer(
    name: string,
    height: number,
    width: number
): Promise<void> {
    try {
        await sharp(`${dir}/${name}.jpg`)
            .resize(width, height)
            .toFile(`${thumbDir}/${name}-thumb.jpg`)
    } catch (error) {
        console.log('The Image was not found to be resized')
    }
}

export { resizer }
