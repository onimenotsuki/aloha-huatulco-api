module.exports = ({ headers }, res, next) => {
  const apiKey = headers['x-api-key'];

  if (apiKey === null || typeof apiKey === 'undefined') {
    return res.status(401).json({
      message:
        'No tienes acceso a este recurso, solicita un api-key al administrador',
    });
  }

  if (apiKey !== process.env.API_KEY) {
    return res
      .status(403)
      .json({ message: 'El api-key es incorrecta. Solicita una nueva.' });
  }

  return next();
};
