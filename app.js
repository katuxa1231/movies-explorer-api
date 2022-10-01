const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { auth } = require('./midlewares/auth');
const { handleError } = require('./midlewares/error');
const { requestLogger, errorLogger } = require('./midlewares/logger');
const NotFound = require('./errors/not-found');
const { corsOptions, MONGO_DB_DEV } = require('./constants/settings');
require('dotenv').config();

const { PORT = 3300, MONGO_DB = MONGO_DB_DEV } = process.env;

const app = express();
app.use(cors(corsOptions));
mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);

app.use('', require('./routes/auth'));

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use('/*', () => {
  throw new NotFound('Путь не существует');
});
app.use(errorLogger);
app.use(errors());
app.use(handleError);
app.listen(PORT);
