const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

const usuariosValidos = [
  {email: 'cfalco@gmail.com' , password: 'cfalco'},
];

app.use(express.urlencoded({extended: false}));

function getWeather() {
  const weathers = ['soleado','parcialmente-nublado','nublado','lluvioso','tormenta','nevado'];
  const pos = Math.floor(Math.random() * weathers.length);
  return weathers[pos];
}

app.get('/get-weather', (req, res, next) => {
  res.json({ weather: getWeather() });
})

app.get('/tiempo', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'tiempo.html'))
})

app.get('/get-city', (req, res, next) => {
  const { lat, lon } = req.query;
  if (lat === '46.874396' && lon === '-96.835556') {
    res.json({ciudad: 'Fargo'});
  } else if (lat === '36.848044' && lon === '-83.320589') {
    res.json({ciudad: 'Harlan'});
  } else if (lat === '52.485973' && lon === '-1.890715') {
    res.json({ciudad: 'Birmingham'});
  } else if (lat === '35.110816' && lon === '-106.668173') {
    res.json({ciudad: 'Albuquerque'});
  } else {
    res.json({ciudad: 'Una ciudad cualquiera...'});
  }
})

app.get('/mocks', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'mocks.html'));
});

app.get('/login', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res, next) => {
  const params = req.body;
  const usuario = usuariosValidos.find(u => {
    return ((u.password === params.password) && (u.email === params.email));
  });

  if (usuario) {
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = http.createServer(app);
server.listen('3000');