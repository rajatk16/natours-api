const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app');

dotenv.config({
  path: './.env'
});

const DB_URI = process.env.DATABASE_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`DB Connection successful`);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on PORT ${port} in ${process.env.NODE_ENV}`);
});
