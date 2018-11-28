const request = require('supertest')
const mocha = require('mocha')
const app = require('../index')


describe('POST /api/game', () => {
    it('should have a json response', done => {
        request(app)
            .post('/api/game')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    it('response match params', done => {
        request(app)
            .post('/api/game')
            .send({number: '3'})
            .expect(res => {
                res.body.actual = '27'
                res.body.result = 'lost'
            })
            .expect('Content-Type', /json/)
            .expect(200, {
                choice: '3',
                actual: '27',
                result: 'lost'
            }, done)
    })

    it('should return homepage', done => {
        request(app)
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200, done)
    })
})
 