var angular = require('angular');
var fastclick = require('fastclick');

fastclick(document.body);

angular.module('maps', [
    require('./components/chart-picker'),
    require('./controllers/tools'),
    require('./services/active-procedures'),
    require('./services/map'),
    require('./services/procedures'),
    require('./services/procedure-renderer')
]);
