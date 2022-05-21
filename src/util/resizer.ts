import sharp from 'sharp'
import path from 'path'

const dir = path.join(__dirname, '../assets/full')

//thumbnail directory
const thumbDir = path.join(__dirname, '../assets/thumb')
async function resizer(
    name: string,
    width: number,
    height: number
): Promise<void> {
    try {
        await sharp(`${dir}/${name}.jpg`)
            .resize(width, height)
            .toFile(`${thumbDir}/${name}-thumb_${height}x${width}.jpg`)
    } catch (error) {
        console.log('The Image was not found to be resized')
    }
}

export { resizer }
