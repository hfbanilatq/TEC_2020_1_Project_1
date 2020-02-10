import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import path from 'path';
import cors from 'cors';
// import history from 'connect-history-api-fallback';
import morgan from 'morgan';
import passport from 'passport';
import https from 'https';
import fs from 'fs';


// Inicializar la app
const app = express();

// Morgan Middleware
app.use(morgan('tiny'));

// Cors Middleware
app.use(cors());

// Json Body Middleware
app.use(bodyparser.json());

// Form data Middleware
app.use(bodyparser.urlencoded({
  extended: false
}));

// Middleware para Vue.js router modo history
// app.use(history());

// Usando el passport Middleware
app.use(passport.initialize());

// Traer El passport Strategy
require('./config/passport')(passport);

// Configurando el directorio estático
app.use(express.static(path.join(__dirname, '../public')));

// Trayendo la base de datos
const database = require('./config/keys').mongoUri;

// Configuraciones de la base de datos
const dbConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

// Conectar a la base de datos
/**
 * Método que me permite conectar a la base de datos MongoDB con mongoose
 * @param database Enlace de la base de datos
 * @param dbConfig Configuraciones para la base de datos
 */
mongoose.connect(database, dbConfig).then(() => {
  console.log(`Conexion a la base de datos establecida ${database}`);
}).catch((err) => {
  console.error(`ha ocurrido un error al conectar a la base de datos ${err}`);
});

// Trayendo las rutas de router
const Users = require('./routes/api/users');
const Sensors = require('./routes/api/sensors');

// Añadiendo las rutas de la appi a la app
app.use('/api/users', Users);
app.use('/api/sensors', Sensors);

// Asignación dinámica del puerto
const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`El servidor se ha iniciado en el puerto ${PORT}`);
// });

https.createServer({
  key: fs.readFileSync('./src/CA.key'),
  cert: fs.readFileSync('./src/CA.crt'),
  passphrase: 'Banilat'
}, app).listen(PORT, () => {
  console.log(`El servidor HTTPS se ha iniciado en el puerto ${PORT}`);
});
