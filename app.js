const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { initRoutes } = require('./routes/index');
const { handleError } = require('./midlewares/error');
const { requestLogger, errorLogger } = require('./midlewares/logger');
const { corsOptions, MONGO_DB_DEV } = require('./constants/settings');
const { limiter } = require('./midlewares/limiter');
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
app.use(limiter);
initRoutes(app);
app.use(errorLogger);
app.use(errors());
app.use(handleError);
app.listen(PORT);
