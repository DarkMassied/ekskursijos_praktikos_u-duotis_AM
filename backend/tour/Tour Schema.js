const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  duration: { type: String, required: true },
  dates: [{ type: Date, required: true }],
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviews: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, comment: String, rating: Number }],
});

module.exports = mongoose.model('Tour', tourSchema);