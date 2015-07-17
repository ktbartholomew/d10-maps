var angular = require('angular');

var moduleName = 'maps.services.active-procedures';
module.exports = moduleName;

angular.module(moduleName, [])
.factory('ActiveProcedures', function (ProcedureRenderer) {

    var storage = {
        read: function () {
            if(!localStorage.getItem(moduleName)) {
                localStorage.setItem(moduleName, JSON.stringify([]));
            }

            return JSON.parse(localStorage.getItem(moduleName));
        },
        write: function (data) {
            localStorage.setItem(moduleName, JSON.stringify(data));
        }
    };

    var renderProcedures = function () {
        ProcedureRenderer.draw(ActiveProcedures);
    };

    var ActiveProcedures = storage.read();

    renderProcedures();

    return {
        get: function () {
            return ActiveProcedures;
        },
        push: function () {
            Array.prototype.push.apply(ActiveProcedures, arguments);
            storage.write(ActiveProcedures);

            renderProcedures();
        },
        set: function (input) {
            ActiveProcedures = input;
            storage.write(ActiveProcedures);

            renderProcedures();
        }
    };
});
