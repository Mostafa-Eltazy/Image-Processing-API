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
})
