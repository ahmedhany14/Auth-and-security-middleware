const express = require('express');

const { sign_up } = require('./../controller/sign_up')
const { log_in } = require('./../controller/log_in')
const router = express.Router();

router.route('/sign_up')
    .post(sign_up);

router.route('/log_in')
    .post(log_in);


module.exports = router;