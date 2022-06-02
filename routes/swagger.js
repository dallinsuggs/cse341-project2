const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const {ensureAuth, ensureGuest } = require('../middleware/auth');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', ensureAuth, swaggerUi.setup(swaggerDocument));

module.exports = router;