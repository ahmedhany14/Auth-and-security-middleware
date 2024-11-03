const express = require('express');

const { sign_up } = require('./../controller/sign_up')

const router = express.Router();

router.route('/sign_up')
    .post(sign_up);

module.exports = router;