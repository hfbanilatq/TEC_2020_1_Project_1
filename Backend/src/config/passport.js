const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('../models/users');

const Sensor = require('../models/sensors');

const key = require('./keys').secret;

const opt = {};
opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = key;

module.exports = (passport) => {
  passport.use('jwt_user',
    new JwtStrategy(opt, (jwtPayload, done) => {
      User.findById(jwtPayload._id).then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      }).catch((err) => {
        console.log(err);
      });
    }));

  passport.use('jwt_sensor',
    new JwtStrategy(opt, (jwtPayload, done) => {
      Sensor.findById(jwtPayload._id).then((sensor) => {
        if (sensor) {
          return done(null, sensor);
        }
        return done(null, false);
      }).catch((err) => {
        console.log(err);
      });
    }));
};
