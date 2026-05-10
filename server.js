require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./src/models');
const PORT = process.env.PORT || 3000;
const startServer = async () => {

  try {
    await sequelize.authenticate();
    console.log(
      'Database connection established'
    );
    await sequelize.sync({
      alter: true,
    });
    console.log(
    'Models synchronized'
    );
    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      'Unable to start server:',
      error
    );
    process.exit(1);
  }
};


startServer();