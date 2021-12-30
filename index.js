const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const errorHandler = require('./middleware/errorHandler');
const authenticated = require('./middleware/authenticated');

const login = require('./routes/auth/login').default;
const register = require('./routes/auth/register');

const getAreas = require('./routes/areas/get');
const createArea = require('./routes/areas/create');
const deleteArea = require('./routes/areas/delete');

const getNetworks = require('./routes/networks/get');

const app = new Koa();
const router = new Router();

router.post('/login', bodyParser(), login);
router.post('/register', bodyParser(), register);

router.get('/areas', authenticated, getAreas);
router.post('/areas', authenticated, bodyParser(), createArea);
router.delete('/areas/:id', authenticated, deleteArea);

router.get('/networks', authenticated, getNetworks);

app.use(errorHandler);
app.use(cors());

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(process.env.PORT || 3050);