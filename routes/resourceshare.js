const express = require('express');
const {get_files} = require('../controller/resource');

const router = express.Router();
router.get('/', get_files);


module.exports = router;