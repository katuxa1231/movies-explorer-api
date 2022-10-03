const { auth } = require('../midlewares/auth');
const authRoute = require('./auth');
const usersRoute = require('./users');
const moviesRoute = require('./movies');
const NotFound = require('../errors/not-found');
const { errorMessage } = require('../constants/api');
const { logout } = require('../controllers/users');

module.exports.initRoutes = (app) => {
  app.use('', authRoute);
  app.use(auth);
  app.post('/logout', logout);
  app.use('/users', usersRoute);
  app.use('/movies', moviesRoute);
  app.use('/*', () => {
    throw new NotFound(errorMessage.pathNotFound);
  });
};
