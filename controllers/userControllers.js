const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getUsers = (req, res, next) => {
  res.status(200).json({
    status: 'Success',
    data: {
      users
    }
  });
};

exports.createUser = (req, res, next) => {
  const newId = users[users.length - 1].id + 1;

  const newUser = Object.assign(
    {
      id: newId
    },
    req.body
  );

  users.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    err => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newUser
        }
      });
    }
  );
};

exports.getUser = (req, res, next) => {
  const user = users.find(user => user._id === req.params.id * 1);

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found'
    });
  }

  res.status(200).json({
    status: 'Success',
    data: {
      user
    }
  });
};

exports.updateUser = (req, res, next) => {
  return res.status(500).json({
    status: 'TBD',
    message: 'Route not created yet'
  });
};

exports.deleteUser = (req, res, next) => {
  return res.status(500).json({
    status: 'TBD',
    message: 'Route not created yet'
  });
};
