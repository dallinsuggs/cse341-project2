const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: "<a href='http://cse341-project2-suggs.herokuapp.com/auth/logout'>Logout</a>",
  },
  host: 'cse341-project2-suggs.herokuapp.com',
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);