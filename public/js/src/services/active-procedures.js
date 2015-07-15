var angular = require('angular');

module.exports = moduleName = 'maps.services.active-procedures';

angular.module(moduleName, [])
.factory('ActiveProcedures', function (ProcedureRenderer) {
    var ActiveProcedures = [];

    var renderProcedures = function () {
        ProcedureRenderer.draw(ActiveProcedures);
    };

    return {
        get: function () {
            return ActiveProcedures;
        },
        push: function () {
            Array.prototype.push.apply(ActiveProcedures, arguments);
            renderProcedures();
        },
        set: function (input) {
            ActiveProcedures = input;
            renderProcedures();
        }
    };
});
