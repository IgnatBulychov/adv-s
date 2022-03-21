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

const getProfile = require('./routes/profile/get');
const updateProfile = require('./routes/profile/edit');
const changeAvatar = require('./routes/profile/changeAvatar');

const getAreas = require('./routes/areas/getAreas');
const getArea = require('./routes/areas/getArea');
const findAreas = require('./routes/areas/find');
const createArea = require('./routes/areas/create');
const updateArea = require('./routes/areas/update');
const deleteArea = require('./routes/areas/delete');

const createOffer = require('./routes/offers/create');
const getMyOffers  = require('./routes/offers/getMyOffers');
const getOthersOffers  = require('./routes/offers/getOthersOffers');

/*
const createService = require('./routes/services/create');
const updateService = require('./routes/services/update');
const deleteService = require('./routes/services/delete');
*/

const getNetworks = require('./routes/networks/get');
const getCategories = require('./routes/categories/get');
const getOffer = require('./routes/offers/getOffer');
const setStatus = require('./routes/offers/setStatus');

const app = new Koa();
const router = new Router();

router.post('/login', bodyParser(), login);
router.post('/register', bodyParser(), register);

router.get('/profile', authenticated, getProfile);
router.put('/profile', authenticated, updateProfile);
router.put('/profile/change-avatar', authenticated, changeAvatar);

router.get('/areas', authenticated, getAreas);
router.get('/areas/search', findAreas);
router.get('/areas/:areaId', getArea);
router.post('/areas', authenticated, bodyParser(), createArea);
router.put('/areas/:areaId', authenticated, authorizateArea, updateArea);
router.delete('/areas/:areaId', authenticated, authorizateArea, deleteArea);


router.get('/offers/my', authenticated, bodyParser(), getMyOffers);
router.get('/offers/others', authenticated, bodyParser(), getOthersOffers);
router.post('/offer', authenticated, bodyParser(), createOffer);

router.get('/offer/:offerId', authenticated, bodyParser(), getOffer);
router.put('/offer/:offerId', authenticated, bodyParser(), setStatus);


/*
router.post('/areas/:areaId/services', authenticated, bodyParser(), createService);
router.put('/areas/:areaId/:serviceId', authenticated, authorizateArea, updateService);
router.delete('/areas/:areaId/:serviceId', authenticated, authorizateArea, deleteService);
*/

router.get('/networks', getNetworks);
router.get('/categories', getCategories);

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