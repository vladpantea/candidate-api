const chalk = require('chalk')
const { ValidationError, DBOperationError, FileUploadError } = require('../errors/errors')
const { serializeError } = require('serialize-error')

function errorLogger(err, req, res, next) {
    if(err){
        if(err.message){
            console.error(chalk.red(err.message))    
        }

        if(err.stack){
            console.error(chalk.red(err.stack))
        }

        if(err.error){
            if(!err.message && err.error.message){
                console.error(chalk.red(err.error.message))    
            }

            if(err.error.stack){
                console.error(chalk.red(err.error.stack))
            }
        }
    }else{
        console.error(chalk.red(JSON.stringify(serializeError(err))))
    }

    next(err)
}

function validationErrorHandler(err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(400).send({ error: err.message })
    } else if (err instanceof DBOperationError) {
        return res.status(500).send({ error: err.message })
    } else if (err instanceof FileUploadError) {
        return res.sendStatus(400)
    }
    next(err)
}

function genericErrorHandler(err, req, res, next) {
    res.sendStatus(500)
    next()
}

module.exports = function ErrorHandlingMiddleware(app) {
    app.use([
        errorLogger,
        validationErrorHandler,
        genericErrorHandler
    ])
}