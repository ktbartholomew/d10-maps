module.exports = function (date) {
    date = date || new Date();

    var cycleLength = 28;
    var cyclesPerYear = 13;
    var epoch = {
        date: new Date('2015-01-08 00:00:00 GMT-0000'),
        year: 15,
        cycle: 1
    };

    var daysSinceEpoch = Math.floor((date - epoch.date) / 86400000);

    var year = (epoch.year + Math.floor(daysSinceEpoch / cycleLength / cyclesPerYear)).toString();
    var cycle = (epoch.cycle + Math.floor(daysSinceEpoch / cycleLength) % cyclesPerYear).toString();

    if(cycle.length === 1) {
        cycle = '0' + cycle;
    }

    return year + cycle;
};
