const DBOperationError = require('../errors/db-operation-error')
const MongoService = require('./mongodb-service')

module.exports = class AliveService {
    mongoService = null
    db = null

    constructor() {
        MongoService.then(ms => {
            this.mongoService = ms
        })
    }

    async isAlive() {
        try {
            let db = await this.mongoService.getDB()
            return await db.serverConfig.isConnected()
        } catch (ex) {
            throw new DBOperationError("Database is not Alive yet!", ex)
        }
    }
}