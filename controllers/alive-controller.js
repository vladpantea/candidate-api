const router = require('express').Router()
const asyncWrapper = require('../utilities/async-wrapper').AsyncWrapper
const AliveService = require('../services/alive-service')

const aliveService = new AliveService()

router.get('/liveness', asyncWrapper(async (req, res) => {
    res.status(200).send()
}))

router.get('/readiness', asyncWrapper(async (req, res) => {
    let alive = await aliveService.isAlive()
    if(alive){
        res.status(200).send()
    }else{
        console.log('Database not ready yet!')
        res.status(500).send()
    }
}))

const closeConnection = () => {
    return aliveService.mongoService.closeConnection()
}

module.exports = {
    router: router,
    connClose: closeConnection
}