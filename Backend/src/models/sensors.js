import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  macAddress: {
    type: String,
    required: [true, 'El mac address del dispositivo es obligatorio'],
    unique: true
  },
  temperature: [{
    date: {
      type: Date,
      default: Date.now
    },
    value: {
      type: Number,
      required: true
    }
  }
  ],
  humedity: [
    {
      date: {
        type: Date,
        default: Date.now
      },
      value: {
        type: String,
        required: true
      }
    }],
  userEmail: {
    type: String,
    required: [true, 'Debe tener el email del usuario']
  }

});
const Sensors = mongoose.model('Sensors', userSchema);
module.exports = Sensors;
