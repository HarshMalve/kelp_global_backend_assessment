const app = require('./app');
const config = require('./config');

app.listen(config.app.port, () => {
  console.log(`Server is running at http://localhost:${config.app.port}`);
});