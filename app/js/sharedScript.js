var Utils = {};

//Compare two dates
Utils.compareDate = function (d1, d2) {
    var day = new Date(d1).getUTCDate() - new Date(d2).getUTCDate();
    var month = new Date(d1).getUTCMonth() - new Date(d2).getUTCMonth();
    var year = new Date(d1).getUTCFullYear() - new Date(d2).getUTCFullYear();
    return day + (month * 30) + (year * 365);
}