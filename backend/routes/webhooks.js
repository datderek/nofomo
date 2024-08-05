const express = require('express');
const { receiveWebhook } = require('../controllers/webhooksController');

const router = express.Router();

router.use(express.raw());

router.post('/', receiveWebhook);

module.exports = router;
