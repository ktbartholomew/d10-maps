var fs = require('fs');
var _ = require('lodash');
var express = require('express');
var compression = require('compression');
var airacCycle = require('./src/lib/airac-cycle');

var app = express();

app.use(compression());
app.use(express.static('./public'));

app.use('/stars', function (req, res) {

    var stars = fs.readFileSync('./public/data/stardp.json', 'utf-8');
    stars = stars.replace(/\{cycle\}/g, airacCycle());
    stars = JSON.parse(stars);
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

    var dps = fs.readFileSync('./public/data/stardp.json', 'utf-8');
    dps = dps.replace(/\{cycle\}/g, airacCycle());
    dps = JSON.parse(dps);
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

var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on http://localhost:' + server.address().port);
});
