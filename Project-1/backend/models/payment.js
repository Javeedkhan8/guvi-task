const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  amount: { type: Number, required: true },
  price_per_day: { type: Number, required: true },
  quantity:{ type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  paymentDate: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
