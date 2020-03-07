const fs = require('fs');
const simpleTours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > simpleTours.length) {
    return res.status(404).json({
      status: 'error',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing name or price'
    });
  }
  next();
};

exports.getTours = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours: simpleTours
    }
  });
};

exports.createTour = (req, res, next) => {
  const newId = simpleTours[simpleTours.length - 1].id + 1;

  const newTour = Object.assign(
    {
      id: newId
    },
    req.body
  );

  simpleTours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(simpleTours),
    err => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

exports.getTour = (req, res, next) => {
  const tour = simpleTours.find(tour => tour.id === req.params.id * 1);

  res.status(200).json({
    status: 'Success',
    data: {
      tour: tour
    }
  });
};

exports.updateTour = (req, res) => {
  const tour = simpleTours.find(tour => tour.id === req.params.id * 1);

  res.status(200).json({
    status: 'Success',
    data: '<UPDATED TOUR HERE>'
  });
};

exports.deleteTour = (req, res) => {
  const tour = simpleTours.find(tour => tour.id === req.params.id * 1);

  res.status(202).json({
    status: 'Success'
  });
};
