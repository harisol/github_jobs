const { Router } = require('express');
const auth = require('../controllers/auth.controller');
const { checkToken } = require('../etc/middleware');
const outletController = require('../controllers/outlet.controller');
const jobController = require('../controllers/job.controller');
const userController = require('../controllers/user.controller');
const { validateCreateRole } = require('../validation/role.validation');
const { validateCreateUser } = require('../validation/user.validation');
const { validateCreateOutlet } = require('../validation/outlet.validation');
const { validateLogin, validateSignup } = require('../validation/auth.validation');
const { date } = require('../etc/helper');

const router = Router();

// register jwt middleware to this router
router.use(checkToken);

router.get('/', (_req, res) => {
    res.json({ message: `Today is ${date('dddd, DD MMM YYYY')}` });
});
router.get('/check-token', (_req, res) => res.json({ message: 'token valid' }));

router.post('/signup', validateSignup(), auth.signup);
// for logout, just detroy token in client storage
router.post('/login', validateLogin(), auth.login);

router.get('/job-list', jobController.jobList);
router.get('/job-detail/:id', jobController.jobDetail);

router.get('/user', userController.listUser);

router.post('/outlet', validateCreateOutlet(), outletController.createOutlet);
router.get('/outlet', outletController.listOutlet);

module.exports = router;
