const mongoose = require('mongoose');

process.on('uncaughtException', err => {
  console.log('UNHANDLED EXCEPTION');
  console.log(err);
  process.exit(1);
});

const app = require('./app');

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

const server = app.listen(port, () => {
  console.log(`App running on PORT ${port} in ${process.env.NODE_ENV}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});