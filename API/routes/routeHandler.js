const router = require('express').Router();
const userRoute = require('./api/users');
const movieRoute = require('./api/movies');
const errorHandler = require('../middleware/error-handler');

router.use('/api', userRoute);
router.use('/api', movieRoute);

router.use(errorHandler);

module.exports = router;