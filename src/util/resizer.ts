import sharp from 'sharp'

async function resizer(
    name: string,
    height: number,
    width: number
): Promise<void> {
    // console.log('xxx', h, w)
    try {
        await sharp(`src/assets/full/${name}.jpg`)
            .resize(width, height)
            .toFile(`src/assets/thumb/${name}.jpg`)
    } catch (error) {
        console.log(error)
    }
}

export { resizer }
