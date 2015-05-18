var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/festivals', function(req, res, next) {
    db.query('select name, date from festival where date > sysdate("YYYY-MM-dd")').then(function (results) {
        res.json(results);
    });
});

module.exports = router;
