const express = require('express');
const dotenv = require('dotenv');
const app = express();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const health = require('express-ping');
const xss = require('xss-clean');
const cors = require('cors');

// Providers
const { calendar } = require('./src/providers/google');

// Rutas
const googleRoutes = require('./src/routes/google');

// Cargamos las variables de entorno
dotenv.config();

const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Protección de cabeceras
app.use(helmet());

// CORS
app.use(cors());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 2000, // limite el número de solicitudes por IP
  }),
);

// Un poco de seguridad
app.use(xss());

// // Metemos en la solicitud a Google Calendar API
// // como Middlewares
app.use((req, _, next) => {
  req.calendar = calendar;
  next();
});

// Ping
app.use(health.ping('/ping'));

// Rutas de Google
app.use('/api/v1/google', googleRoutes);

app.listen(port, () => console.log(`Server running on port:${port}`));
