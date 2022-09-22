const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  deviceid:{
    type:Number,
    required:true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const History = mongoose.model('History', HistorySchema);

module.exports = History;
