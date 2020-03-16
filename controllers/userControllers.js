const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    message: 'success',
    data: {
      users
    }
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const foundUser = await User.findById(req.params.id);

  if (!foundUser) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: {
      foundUser
    }
  });
});
