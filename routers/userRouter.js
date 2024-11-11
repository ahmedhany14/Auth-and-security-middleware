const express = require('express');

const { sign_up } = require('./../controller/sign_up')
const { log_in } = require('./../controller/log_in')
const { reset } = require('./../controller/reset_password')
const { protect } = require('./../middleware/protect')
const { customTemporaryToken } = require('../middleware/createToken')
const { linkToResetPassword } = require('./../controller/resetEmail')
const { resetPassWithToken } = require('./../controller/resetWithToken')
const { log_out } = require('./../controller/logout')
const { PreventAccess } = require('./../middleware/permission')
const { me, userData } = require('./../controller/myData')


const passport = require('./../middleware/passportConf')

const router = express.Router();

router.route('/sign_up')
    .post(sign_up);

router.route('/log_in')
    .post(log_in);
//---------------------------------Google---------------------------------

const createToken = require('./../controller/CreateToken');
router.get('/google', passport.authenticate('google', { scope: ['prfile'] }));

router.get('/google_redirect',
    passport.authenticate('google', { scope: ['prfile'] }),
    async (request, response) => {
        await createToken(request.user, 200, response);
    }
);

//------------------------------------------------------------------------

router.route('/me')
    .get(protect, me);

router.route('/reset_password')
    .post(protect, reset);

router.route('/forget_password')
    .post(customTemporaryToken, linkToResetPassword);

router.route('/reset_password/:token')
    .post(resetPassWithToken);

router.route('/log_out')
    .get(log_out);

router.route('/:id')
    .get(protect, PreventAccess('super-admin'), userData);
module.exports = router;