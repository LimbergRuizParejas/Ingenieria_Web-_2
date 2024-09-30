const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../frontend/webpack.config.js'); // Ruta actualizada

const app = express();
const compiler = webpack(config);

// Configurar webpack-dev-middleware
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true },
}));

// Configurar webpack-hot-middleware
app.use(webpackHotMiddleware(compiler));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '../frontend/public'))); // Ruta actualizada

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Redirigir todas las solicitudes al archivo 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public', 'index.html')); // Ruta actualizada
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor frontend corriendo en el puerto ${PORT}`);
});
