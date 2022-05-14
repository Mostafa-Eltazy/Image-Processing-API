import app from '../index'
import supertest from 'supertest'
const request = supertest(app)
describe('Test endpoint response', () => {
    it('gets the the main route api endpoint', async () => {
        const response = await request.get('/')
        expect(response.status).toBe(200)
    })

    it('gets the /image api endpoint with no params', async () => {
        const response = await request.get('/images')
        expect(response.status).toBe(400)
    })

    it('gets the /image api endpoint with correct params', async () => {
        const response = await request.get(
            '/images?name=cat&height=200&width=200'
        )
        expect(response.status).toBe(200)
    })
})
