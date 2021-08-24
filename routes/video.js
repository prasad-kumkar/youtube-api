var express = require('express');
var router = express.Router();

const { getVideos } = require('../controllers/youtube');

/* GET home page. */
router.get('/getVideos', function(req, res, next) {
  getVideos(req, res)
});

module.exports = router;
