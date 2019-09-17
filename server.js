const express = require('express');
const Middleware = require('./middleware/middleware');
const dotenv = require('dotenv');
const ErrorHandlingMiddleware = require('./middleware/error-handler');

dotenv.config();

const app = express();
Middleware(app);

const CandidatesController = require('./controllers/candidates-controller');
app.use('/api/candidates', CandidatesController);

ErrorHandlingMiddleware(app);

module.exports = app;