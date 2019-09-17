const chai = require('chai')
const expect = chai.expect
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer
const mongod = new MongoMemoryServer()

let app = null
let request = null
let uri = null
let port = null
let dbPath = null
let dbName = null
let env = null
const MONGODB_SERVER = '127.0.0.1'
let candidate_id = null

before(async () => {
    uri = await mongod.getConnectionString()
    port = await mongod.getPort()
    dbPath = await mongod.getDbPath()
    dbName = await mongod.getDbName()
    instanceInfo = await mongod.getInstanceInfo()

    app = require('../server')
    request = require('supertest')

    env = Object.assign({}, process.env)
    process.env.MONGODB_SERVER = MONGODB_SERVER
    process.env.MONGODB_SERVER_PORT = port
    process.env.MONGODB_DB = dbName
    process.env.MONGODB_DB_USER = ''
    process.env.MONGODB_DB_PASS = ''
    process.env.UPLOAD_FOLDER = 'test/uploaded_test_cv'
})

after(async () => {
    process.env = env

    if (mongod) await mongod.stop()
})

describe('API TESTS', function () {

    describe('Seed Candidates DB', () => {
        it('add 1 candidate to DB', async () => {
            request(app)
                .post('/api/candidates')
                .field('name', 'John Doe')
                .field('email', 'john_doe@gmail.com')
                .field('phone', '440789012458')
                .attach('cv', './test/TonyAbbot.pdf')
                .expect(200)
                .end((err, res) => {
                    expect(err).to.be.null
                    candidate_id = res.body._id
                })
        }).timeout(2000)
    })

    describe('Candidates API tests', () => {
        it('expect GET /api/candidates returns list of candidates', async () => {
            request(app)
                .get('/api/candidates')
                .expect(200)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res.body.length).to.equal(1)
                })
        }).timeout(2000)

        it('expect GET /api/candidates/:id return 400 with validation message', async () => {
            request(app)
                .get('/api/candidates/5d7221107a4812a1ac9e223')
                .expect(400)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res.error.message).to.equal('cannot GET /api/candidates/5d7221107a4812a1ac9e223 (400)')
                })
        }).timeout(2000)

        it('expect GET /api/candidates/:id return 200 with object', async () => {
            request(app)
                .get(`/api/candidates/${candidate_id}`)
                .expect(200)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res.body._id).to.equal(candidate_id)
                })
        }).timeout(2000)

        it('expect GET /api/candidates/:id return 200 with empty object', async () => {
            request(app)
                .get('/api/candidates/5d7221107a4812a1ac9e2999')
                .expect(200)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(Object.keys(res.body).length).to.equal(0)
                })
        }).timeout(2000)

        it('expect POST /api/candidates return 200 with created object', async () => {
            request(app)
                .post('/api/candidates')
                .field('name', 'Jane Doe')
                .field('email', 'jane_doe@gmail.com')
                .field('phone', '440789012459')
                .attach('cv', './test/TonyAbbot.pdf')
                .expect(200)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res.body._id).to.not.be.null
                })
        }).timeout(2000)

        it('expect POST /api/candidates return 400 with validation error', async () => {
            const toPass = {
                "name": "John Doe",
                "price": 99,
                "type": "monthly"
            }

            request(app)
                .post('/api/candidates')
                .field('name', 'Jane Doe')                
                .field('phone', '440789012459')
                .attach('cv', './test/TonyAbbot.pdf')
                .expect(400)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res.error.message).to.equal("cannot POST /api/candidates (400)")
                })
        }).timeout(2000)

        it('expect DELETE /api/candidates/:id return 204', async () => {

            request(app)
                .delete(`/api/candidates/${candidate_id}`)
                .expect(204)
                .end((err, res) => {
                    expect(err).to.be.null
                })
        }).timeout(2000)

        it('expect DELETE /api/candidates/:id return 400', async () => {

            request(app)
                .delete('/api/candidates/5d7221107a4812a1ac9e2239')
                .expect(400)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res.error.message).to.equal("cannot DELETE /api/candidates/5d7221107a4812a1ac9e2239 (400)")
                })
        }).timeout(2000)
    })
})
