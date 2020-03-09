const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Tour must have a name'],
      unique: [true, 'Tour Name is already used'],
      maxlength: [
        40,
        'A tour name must have less than or equal to 40 characters'
      ],
      minlength: [
        10,
        'A tour name must have more than or equal to 10 characters'
      ],
      validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: {
      type: String
    },
    duration: {
      type: Number,
      required: [true, 'A Tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A Tour must have maximum group size']
    },
    difficulty: {
      type: String,
      required: [true, 'A Tour must have difficulty level'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty can be easy, medium, or difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.4,
      min: [1, 'Rating must be more than 0'],
      max: [5, 'Rating must be less than 5.0']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A Tour must have a price']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          return val < this.price;
        },
        message: 'Discound price {{VALUE}} should be below regular price'
      }
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must a have a description']
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have an image cover']
    },
    images: {
      type: [String]
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    startDates: {
      type: [Date]
    },
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, {
    lower: true
  });
  next();
});

tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  this.state = Date.now();
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({
    $match: {
      secretTour: {
        $ne: true
      }
    }
  });
  next();
});

tourSchema.virtual('durationWeeks').get(function() {
  if (this.duration % 7 === 0) {
    return this.duration / 7;
  }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
