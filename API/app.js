'use strict'
const express = require('express');
const db = require('./models');
const routes = require('./routes/routeHandler')
const cors = require('cors');

const app = express();

// creates port variable
const PORT = process.env.PORT || 5000;

// Enable All CORS Requests
app.use(cors());

// Body parser
app.use(express.json());

app.use(routes);

(async () => {
    await db.sequelize.sync();
    try {
      await db.sequelize.authenticate();
      console.log('Connection to the database successful!');
    } catch (error) {
      console.error('Error connecting to the database: ', error);
    }
  })();
  
  app.listen(PORT, () => {
    console.log(`Express server is listening on port ${PORT}`);
  });