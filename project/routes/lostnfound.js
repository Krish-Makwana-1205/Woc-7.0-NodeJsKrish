const express = require('express');
const {get_lost,post_lost} = require('../controller/lostnfound');
const router = express.Router();

router.get('/', get_lost);

module.exports = router;