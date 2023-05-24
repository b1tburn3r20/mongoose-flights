const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const destinationSchema = new Schema(
  {
    airport: {
      type: String,
      enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
      required: true,
    },
    arrival: Date,
  }
)
const flightSchema = new Schema(
  {
    airline: {
      type: String,
      enum: ['American', 'Southwest', 'United'],
      required: true,
    },
    airport: {
      type: String,
      enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
      required: true,
    },
    flightNo: {
      type: Number,
      min: 0,
      max: 99999999,
      required: true,
    },
    departs: {
      type: Date,
      required: true,
    },
    destinations: [destinationSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Flight', flightSchema);
