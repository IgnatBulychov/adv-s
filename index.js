const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
var serve = require('koa-static');

const errorHandler = require('./middleware/errorHandler');
const authenticated = require('./middleware/authenticated');
const authorizateArea = require('./middleware/authorizateArea');
// const authorizateService = require('./middleware/authorizateArea');

const login = require('./routes/auth/login');
const register = require('./routes/auth/register');

const getAreas = require('./routes/areas/get');
const findAreas = require('./routes/areas/find');
const createArea = require('./routes/areas/create');
const updateArea = require('./routes/areas/update');
const deleteArea = require('./routes/areas/delete');

const createService = require('./routes/services/create');
const updateService = require('./routes/services/update');
const deleteService = require('./routes/services/delete');

const getNetworks = require('./routes/networks/get');

const app = new Koa();
const router = new Router();

router.post('/login', bodyParser(), login);
router.post('/register', bodyParser(), register);

router.get('/areas', authenticated, getAreas);
router.get('/areas/search', findAreas);
router.post('/areas', authenticated, bodyParser(), createArea);
router.put('/areas/:areaId', authenticated, authorizateArea, updateArea);
router.delete('/areas/:areaId', authenticated, authorizateArea, deleteArea);

router.post('/areas/:areaId/services', authenticated, bodyParser(), createService);
router.put('/areas/:areaId/:serviceId', authenticated, authorizateArea, updateService);
router.delete('/areas/:areaId/:serviceId', authenticated, authorizateArea, deleteService);

router.get('/networks', authenticated, getNetworks);

app.use(errorHandler);
app.use(cors());
app.use(serve('./public'));
app.use(bodyParser({
  formLimit:"5mb",
  jsonLimit:"5mb"
}));

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(process.env.PORT || 3050);