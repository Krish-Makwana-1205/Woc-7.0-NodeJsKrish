const express = require('express');
const {displayHome} = require('../controller/static');
const {restrictToLoggedinUserOnly} = require('../middleware/logincheck');

const router = express.Router();

router.get('/',restrictToLoggedinUserOnly, displayHome);

module.exports = router;