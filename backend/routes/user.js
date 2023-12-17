const express = require('express');
const router = express.Router();
const wikiController = require('../controllers/wikiController')

router.get('/search/:searchTerm', wikiController.search)
router.get('/read/:slug', wikiController.slug)


module.exports = router;