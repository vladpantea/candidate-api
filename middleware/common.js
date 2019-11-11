const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

module.exports = function CommonMiddleware(app) {
    app.use(bodyParser.json({ type: 'application/json' }))    
    app.use(morgan('common', {
        skip: (req,res) => {
            let base = req.originalUrl
            if(base === '/liveness'){
                return true
            }else if(base === '/readiness'){
                return true
            }else{
                return false
            }
        }
    }))
    app.use(cors())
    app.use(helmet())
}