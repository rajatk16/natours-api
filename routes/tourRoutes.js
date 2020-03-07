const express = require('express');

const {
  getTour,
  getTours,
  createTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody
} = require('../controllers/tourControllers');

const router = express.Router();

router.param('id', checkID);

router
  .route('/')
  .get(getTours)
  .post(checkBody, createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
