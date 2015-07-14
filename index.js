var fs = require('fs');
var _ = require('lodash');
var express = require('express');
var compression = require('compression');

var app = express();

app.use(compression());
app.use(express.static('./public'));

app.use('/stars', function (req, res) {

    var stars = JSON.parse(fs.readFileSync('./public/maps/stardp.json', 'utf-8'));
    stars = _.filter(stars, function (item) {
        return item.type === 'STAR';
    });

    if(req.query.airport) {
        req.query.airport = req.query.airport.replace(/^[kK]/, '');

        stars = _.filter(stars, function (item) {
            return _.find(item.airports, {identifier: req.query.airport.toUpperCase()});
        });
    }

    if(req.query.name) {
        stars = _.filter(stars, function (item) {
            return item.name.toLowerCase().indexOf(req.query.name.toLowerCase()) !== -1 ||
                item.legs[0].computerCode.toLowerCase().indexOf(req.query.name.toLowerCase()) !== -1;
        });
    }

    res.send(stars);
});

app.use('/dps', function (req, res) {

    var dps = JSON.parse(fs.readFileSync('./public/maps/stardp.json', 'utf-8'));
    dps = _.filter(dps, function (item) {
        return item.type === 'DP';
    });

    if(req.query.airport) {
        req.query.airport = req.query.airport.replace(/^[kK]/, '');

        dps = _.filter(dps, function (item) {
            return _.find(item.airports, {identifier: req.query.airport.toUpperCase()});
        });
    }

    if(req.query.name) {
        dps = _.filter(dps, function (item) {
            return item.name.toLowerCase().indexOf(req.query.name.toLowerCase()) !== -1 ||
                item.legs[0].computerCode.toLowerCase().indexOf(req.query.name.toLowerCase()) !== -1;
        });
    }

    res.send(dps);
});

var server = app.listen(3000, function () {
    console.log('Listening on http://localhost:' + server.address().port);
});
