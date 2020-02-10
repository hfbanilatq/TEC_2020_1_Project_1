import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  lastname: {
    type: String,
    required: [true, 'El apellido es obligatorio']
  },
  sex: {
    type: String,
    required: [true, 'El sexo es requerido']
  },
  email: {
    type: String,
    required: [true, 'El correo es requerido']
  },
  password: {
    type: String,
    required: [true, 'Se requiere una contraseña']
  },
  address: {
    type: String,
    required: [true, 'Debe tener una direccion']
  },
  city: {
    type: String,
    required: [true, 'Debe tener una Ciudad']
  },
  department: {
    type: String,
    required: [true, 'Debe tener un Departamento']
  },
  zip: Number,
  date: {
    type: Date,
    default: Date.now
  }

});
const User = mongoose.model('User', userSchema);
module.exports = User;
