const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;
const connect = require('./db/connect');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

connect.initDatabase();

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', require('./routes'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
