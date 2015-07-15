var angular = require('angular');

angular.module('maps', [
    require('./controllers/tools'),
    require('./services/active-procedures'),
    require('./services/map'),
    require('./services/procedures'),
    require('./services/procedure-renderer')
]);
