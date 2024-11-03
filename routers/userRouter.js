const express = require('express');

const { } = require('./../controller/sign_up')

const router = express.Router();

router.route('/sign_up')
    .post(sign_up);

module.exports = router;