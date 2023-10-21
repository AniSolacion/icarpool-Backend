// models/reservation.js
const mongoose = require('mongoose');
const { MongoClient, ObjectId } = require('mongodb'); // Used to allow for use of Mongo's ObjectId

const reservationSchema = new mongoose.Schema({
  _id: ObjectId,
  userId: ObjectId,
  carpoolId: ObjectId,
  reservedSeats: Number,
  createdAt: Date
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
