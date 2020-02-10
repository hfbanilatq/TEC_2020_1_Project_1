import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const key = require('../../config/keys').secret;

const router = express.Router();

// Importando el modelo de usuario
const Sensor = require('../../models/sensors');

/**
 * @route POST api/users/register
 * @desc Register the user
 * @access Public
 */

router.post('/register', (req, res) => {
  const {
    macAddress,
    temperature,
    humedity,
    userEmail
  } = req.body;


  // Comprobando que el Correo sea unico
  Sensor.findOne({ macAddress }).then((sensor) => {
    if (sensor) {
      return res.status(400).json({
        mensaje: 'El dispositivo ya ha sido registrado por otro usuario'
      });
    }
  });

  // La informacion es valida, se prodece a registrar el usuario
  const newSensor = new Sensor({
    macAddress,
    temperature,
    humedity,
    userEmail
  });

  newSensor.save().then((sensor) => res.status(201).json({
    Success: true,
    sensor,
    mensaje: 'El nuevo usuario ha sido creado'

  })).catch((err) => res.status(400).json({
    mensaje: `Ha Ocurrido un error ${err}`
  }));
});

/**
* @route POST api/sensors/login
* @desc Login the sensor
* @access Public
*/

router.post('/login', (req, res) => {
  const reqSensor = req.body;
  Sensor.findOne({ email: reqSensor.email }).then((sensor) => {
    if (!sensor) {
      res.status(400).json({
        mensaje: 'Sensor no encontrado',
        Success: false
      });
    }

    // El sensor se encontro

    if (reqSensor.userEmail === sensor.userEmail) {
      const payload = {
        _id: sensor._id,
        macAddress: sensor.macAddress,
        userEmail: sensor.userEmail
      };

      jwt.sign(payload, key, { expiresIn: 604800 },
        (err, token) => {
          res.status(200).json({
            Success: true,
            sensor,
            token: `Bearer ${token}`,
            mensaje: 'Iniciaste session'
          });
        });
    }
  });
});

/**
 * @route POST api/sensors/new-value
 * @description Add new value to temperature or humedity sensor
 * @access Private
 */
router.post('/new-value', passport.authenticate('jwt_sensor', { session: false }), (req, res) => {
  const {
    _id,
    temperature,
    humedity
  } = req.body;
  Sensor.findByIdAndUpdate(_id,
    { $push: { temperature, humedity } },
    { strict: false }).then(() => {
    res.status(200).json(req.body);
  });
});

/**
* @route GET api/users/profile
* @desc Return user Data
* @access Private
*/


router.get('/data', (req, res) => {
  Sensor.find().then((sensor) => {
    if (sensor) {
      res.status(200).json(sensor);
    }
    res.status(400).json({ mensaje: 'No se encontraron datos' });
  });
});

router.get('/devices:emailUser', (req, res) => {
  if (req.params.userEmail) {
    console.log('Existing params', req.params.userEmail);

    Sensor.find({ userEmail: req.params.userEmail }).then((sensors) => {
      if (sensors) {
        return res.status(200).json(sensors);
      }
    });
  }
});

/**
* @route GET api/sensors
* @desc Return user Data
* @access Public
*/
router.get('/list', async (req, res) => {
  try {
    const sensorDB = await Sensor.find();
    res.json(sensorDB);
  } catch (error) {
    res.status(400).json({
      mensaje: 'ocurrio un error',
      error
    });
  }
});


module.exports = router;
