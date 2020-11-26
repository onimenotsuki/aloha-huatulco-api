const express = require('express');
const dotenv = require('dotenv');
const app = express();

// Providers
const { calendar } = require('./src/providers/google');

// Rutas
const googleRoutes = require('./src/routes/google');

// Cargamos las variables de entorno
dotenv.config();

const port = process.env.PORT || 3000;

// // Metemos en la solicitud a Google Calendar API
// // como Middlewares
app.use((req, _, next) => {
  req.calendar = calendar;
  next();
});

app.use('/api/v1/google', googleRoutes);

app.listen(port, () => console.log(`Server running on port:${port}`));
