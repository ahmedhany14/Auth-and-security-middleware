const express = require('express');

const {sign_up} = require('./../controller/sign_up')
const {log_in} = require('./../controller/log_in')
const {protect} = require('./../middleware/protect')
const {PreventAccess} = require('./../middleware/permission')
const {me, userData} = require('./../controller/myData')

const router = express.Router();

router.route('/sign_up')
    .post(sign_up);

router.route('/log_in')
    .post(log_in);

router.route('/me')
    .get(protect, me);

router.route('/:id')
    .get(protect, PreventAccess('super-admin'), userData);
module.exports = router;