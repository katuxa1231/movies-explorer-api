const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://movies-info.nomoredomains.icu',
    'https://movies-info.nomoredomains.icu',
    'https://katuxa1231.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = { corsOptions };
