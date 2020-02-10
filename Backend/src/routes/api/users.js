import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const key = require('../../config/keys').secret;

const router = express.Router();

// Importando el modelo de usuario
const User = require('../../models/users');

/**
* @route GET api/users/profile
* @desc Return user Data
* @access Private
*/

router.get('/profile', passport.authenticate('jwt_user', { session: false }), (req, res) => {
  res.status(200).json(req.user);
});

router.get('/list', async (req, res) => {
  const userDB = await User.find();
  return res.json(userDB);
});

/**
 * @route POST api/users/register
 * @desc Register the user
 * @access Public
 */

router.post('/register', (req, res) => {
  const {
    name,
    lastname,
    sex,
    email,
    password,
    confirmPassword,
    address,
    city,
    department,
    zip
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      mensaje: 'Las contraseñas no coinciden'
    });
  }

  // Comprobando que el Correo sea unico
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({
        mensaje: 'El Correo ya se encuentra registrado. ¿Olvidaste la contraseña?'
      });
    }
  });

  // La informacion es valida, se prodece a registrar el usuario
  const newUser = new User({
    name,
    lastname,
    sex,
    email,
    password,
    address,
    city,
    department,
    zip
  });

  // Codificando la contraseña

  bcrypt.genSalt(10, (err, salt) => {
    // eslint-disable-next-line no-shadow
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save().then((user) => res.status(201).json({
        Success: true,
        user,
        mensaje: 'El nuevo usuario ha sido creado'

      })).catch((error) => res.status(400).json({
        mensaje: `Ha Ocurrido un error ${error}`
      }));
    });
  });
});

/**
* @route POST api/users/login
* @desc Login the user
* @access Public
*/

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(400).json({
        Success: false,
        user: req.body,
        mensaje: 'Usuario no encontrado'
      });
    }

    // El usuario se encontro

    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        // La contraseña de ususario es correcta.

        const payload = {
          _id: user._id,
          name: user.name,
          lastname: user.lastname,
          email: user.email
        };

        jwt.sign(payload, key, { expiresIn: 604800 },
          (err, token) => res.status(200).json({
            Success: true,
            user,
            token: `Bearer ${token}`,
            mensaje: 'Iniciaste session'
          }));
      } else if (!user) {
        return res.status(400).json({
          mensaje: 'La contraseña es inconrrecta',
          Success: false
        });
      }
    });
  });
});

module.exports = router;
